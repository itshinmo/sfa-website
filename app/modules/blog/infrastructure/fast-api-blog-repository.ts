import { z } from "zod";
import { BlogRepositoryError } from "../application/blog-repository-error";
import type {
  BlogRepository,
  GetBlogPostInput,
  GetRelatedPostsInput,
} from "../application/ports/blog-repository";
import type {
  BlogListQuery,
  BlogListResult,
  BlogPost,
  BlogPostSummary,
  BlogSitemapEntry,
  BlogTag,
  Locale,
} from "../domain/post";
import {
  blogApiErrorSchema,
  blogListResponseSchema,
  blogPostSchema,
  blogSitemapResponseSchema,
  blogSummarySchema,
  blogTagsResponseSchema,
} from "./blog-api-schemas";

const DEFAULT_PAGE_SIZE = 9;
const MAX_PAGE_SIZE = 50;
const DEFAULT_TIMEOUT_MS = 5_000;

type FetchImplementation = typeof fetch;

export type FastApiBlogRepositoryOptions = {
  baseUrl: string;
  token?: string;
  timeoutMs?: number;
  /** Injectable for contract tests; defaults to the server's global fetch. */
  fetchImpl?: FetchImplementation;
};

function clampInteger(
  value: number | undefined,
  fallback: number,
  min: number,
  max: number,
) {
  if (value === undefined || !Number.isFinite(value)) return fallback;

  return Math.min(Math.max(Math.floor(value), min), max);
}

function isAbortError(error: unknown) {
  if (!(error instanceof Error)) return false;

  return error.name === "AbortError" || error.name === "TimeoutError";
}

async function parseErrorBody(response: Response) {
  try {
    const result = blogApiErrorSchema.safeParse(await response.json());
    return result.success ? result.data.error : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Server-only adapter for the read-only FastAPI blog contract.
 *
 * The bearer token never reaches the browser because routes call this adapter
 * from loaders and the website is server-rendered.
 */
export class FastApiBlogRepository implements BlogRepository {
  private readonly baseUrl: string;
  private readonly token?: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl: FetchImplementation;

  constructor({
    baseUrl,
    token,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    fetchImpl,
  }: FastApiBlogRepositoryOptions) {
    const normalizedBaseUrl = baseUrl.trim().replace(/\/+$/, "");

    // Fail fast on an invalid deployment configuration instead of fetching a
    // relative URL from an unknown origin.
    new URL(normalizedBaseUrl);

    this.baseUrl = normalizedBaseUrl;
    this.token = token?.trim() || undefined;
    this.timeoutMs = timeoutMs;
    this.fetchImpl = fetchImpl ?? fetch;
  }

  async listPosts(query: BlogListQuery): Promise<BlogListResult> {
    const url = this.buildUrl("/posts", {
      locale: query.locale,
      page: clampInteger(query.page, 1, 1, Number.MAX_SAFE_INTEGER),
      pageSize: clampInteger(query.pageSize, DEFAULT_PAGE_SIZE, 1, MAX_PAGE_SIZE),
      tag: query.tag?.trim() || undefined,
      q: query.q?.trim() || undefined,
    });

    return this.request(url, blogListResponseSchema);
  }

  async getPost({
    locale,
    slug,
    fallbackLocale,
  }: GetBlogPostInput): Promise<BlogPost | null> {
    const url = this.buildUrl(`/posts/${encodeURIComponent(slug)}`, {
      locale,
      fallback: fallbackLocale && fallbackLocale !== locale ? fallbackLocale : undefined,
    });

    return this.request(url, blogPostSchema, true);
  }

  async getTags(locale: Locale): Promise<BlogTag[]> {
    const url = this.buildUrl("/tags", { locale });

    return this.request(url, blogTagsResponseSchema);
  }

  async getRelatedPosts({
    locale,
    slug,
    limit = 3,
  }: GetRelatedPostsInput): Promise<BlogPostSummary[]> {
    const url = this.buildUrl(`/posts/${encodeURIComponent(slug)}/related`, {
      locale,
      limit: clampInteger(limit, 3, 1, 20),
    });

    const related = await this.request(url, z.array(blogSummarySchema), true);

    return related ?? [];
  }

  async getSitemap(locale: Locale): Promise<BlogSitemapEntry[]> {
    const url = this.buildUrl("/sitemap", { locale });

    return this.request(url, blogSitemapResponseSchema);
  }

  private buildUrl(path: string, params: Record<string, string | number | undefined>) {
    const url = new URL(`${this.baseUrl}${path}`);

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === "") continue;
      url.searchParams.set(key, String(value));
    }

    return url;
  }

  private headers() {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(url: URL, schema: z.ZodType<T>): Promise<T>;
  private async request<T>(
    url: URL,
    schema: z.ZodType<T>,
    allowNotFound: boolean,
  ): Promise<T | null>;
  private async request<T>(
    url: URL,
    schema: z.ZodType<T>,
    allowNotFound = false,
  ): Promise<T | null> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    let response: Response;

    try {
      response = await this.fetchImpl(url, {
        method: "GET",
        headers: this.headers(),
        signal: controller.signal,
      });
    } catch (error) {
      if (controller.signal.aborted || isAbortError(error)) {
        throw new BlogRepositoryError(
          "timeout",
          `Blog API request timed out after ${this.timeoutMs}ms.`,
          { cause: error },
        );
      }

      throw new BlogRepositoryError("network_error", "Blog API request failed.", {
        cause: error,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (response.status === 404 && allowNotFound) {
      return null;
    }

    if (!response.ok) {
      const apiError = await parseErrorBody(response);

      throw new BlogRepositoryError(
        "http_error",
        apiError?.message ?? `Blog API responded with status ${response.status}.`,
        {
          status: response.status,
          apiCode: apiError?.code,
        },
      );
    }

    let payload: unknown;

    try {
      payload = await response.json();
    } catch (error) {
      throw new BlogRepositoryError(
        "invalid_response",
        "Blog API returned a body that is not valid JSON.",
        { status: response.status, cause: error },
      );
    }

    const result = schema.safeParse(payload);

    if (!result.success) {
      console.error(
        `[blog-api] Response validation failed for ${url.pathname}`,
        result.error.flatten(),
      );

      throw new BlogRepositoryError(
        "invalid_response",
        "Blog API response did not match the published contract.",
        { status: response.status, cause: result.error },
      );
    }

    return result.data;
  }
}
