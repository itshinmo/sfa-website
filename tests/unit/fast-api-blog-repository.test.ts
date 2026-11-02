import { describe, expect, it, vi } from "vitest";
import { BlogRepositoryError } from "~/modules/blog/application/blog-repository-error";
import { createBlogRepository } from "~/modules/blog/blog-module";
import { BLOG_TEMPLATES } from "~/modules/blog/domain/post";
import { FastApiBlogRepository } from "~/modules/blog/infrastructure/fast-api-blog-repository";
import { mockPosts } from "~/modules/blog/infrastructure/mock-data";
import { MockBlogRepository } from "~/modules/blog/infrastructure/mock-repository";

const baseUrl = "https://api.example.test/api/blog/";

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function repository(fetchImpl: typeof fetch, token?: string) {
  return new FastApiBlogRepository({ baseUrl, token, fetchImpl });
}

function firstCall(fetchMock: ReturnType<typeof vi.fn>) {
  const [input, init] = fetchMock.mock.calls[0] as [RequestInfo | URL, RequestInit];
  return { url: new URL(String(input)), init };
}

describe("FastApiBlogRepository", () => {
  it("requests the list endpoint with contract params and bearer auth", async () => {
    const post = mockPosts[0];
    const { content: _content, ...summary } = post;
    const fetchMock = vi.fn(async () =>
      jsonResponse({ items: [summary], page: 2, pageSize: 5, total: 6, totalPages: 2 }),
    );

    const result = await repository(
      fetchMock as unknown as typeof fetch,
      "server-secret",
    ).listPosts({
      locale: "fa",
      page: 2,
      pageSize: 5,
      tag: "soil",
      q: "خاک",
    });

    const { url, init } = firstCall(fetchMock);

    expect(url.origin + url.pathname).toBe("https://api.example.test/api/blog/posts");
    expect(url.searchParams.get("locale")).toBe("fa");
    expect(url.searchParams.get("page")).toBe("2");
    expect(url.searchParams.get("pageSize")).toBe("5");
    expect(url.searchParams.get("tag")).toBe("soil");
    expect(url.searchParams.get("q")).toBe("خاک");
    expect(init.headers).toMatchObject({
      Accept: "application/json",
      Authorization: "Bearer server-secret",
    });
    expect(result.totalPages).toBe(2);
    expect(result.items[0]?.slug).toBe(post.slug);
  });

  it("omits the authorization header when no token is configured", async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({ items: [], page: 1, pageSize: 9, total: 0, totalPages: 0 }),
    );

    await repository(fetchMock as unknown as typeof fetch).listPosts({ locale: "en" });

    const { init } = firstCall(fetchMock);
    expect(init.headers).not.toHaveProperty("Authorization");
  });

  it.each(BLOG_TEMPLATES)("validates the %s content union", async (template) => {
    const post = mockPosts.find(
      (item) => item.template === template && item.locale === "en",
    );

    expect(post).toBeDefined();

    const fetchMock = vi.fn(async () => jsonResponse(post));
    const result = await repository(fetchMock as unknown as typeof fetch).getPost({
      locale: "en",
      slug: post?.slug ?? "",
    });

    expect(result?.content.type).toBe(template);
    expect(result?.title).toBe(post?.title);
  });

  it("sends the fallback locale and validates fallback metadata", async () => {
    const fallbackPost = {
      ...mockPosts[0],
      contentLocale: "fa" as const,
      isFallback: true,
    };
    const fetchMock = vi.fn(async () => jsonResponse(fallbackPost));

    const result = await repository(fetchMock as unknown as typeof fetch).getPost({
      locale: "en",
      slug: "مثلث-بافت-خاک",
      fallbackLocale: "fa",
    });

    const { url } = firstCall(fetchMock);
    expect(url.pathname).toBe(
      "/api/blog/posts/%D9%85%D8%AB%D9%84%D8%AB-%D8%A8%D8%A7%D9%81%D8%AA-%D8%AE%D8%A7%DA%A9",
    );
    expect(url.searchParams.get("locale")).toBe("en");
    expect(url.searchParams.get("fallback")).toBe("fa");
    expect(result?.isFallback).toBe(true);
    expect(result?.contentLocale).toBe("fa");
  });

  it("returns null only for a missing detail post", async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({ error: { code: "not_found", message: "Post not found" } }, 404),
    );
    const repo = repository(fetchMock as unknown as typeof fetch);

    await expect(repo.getPost({ locale: "fa", slug: "missing" })).resolves.toBeNull();
    await expect(
      repo.getRelatedPosts({ locale: "fa", slug: "missing" }),
    ).resolves.toEqual([]);
  });

  it("loads tags and related posts", async () => {
    const tags = [{ slug: "soil", label: "خاک", count: 4 }];
    const { content: _content, ...summary } = mockPosts[0];
    const tagsFetch = vi.fn(async () => jsonResponse(tags));
    const relatedFetch = vi.fn(async () => jsonResponse([summary]));

    const tagResult = await repository(tagsFetch as unknown as typeof fetch).getTags(
      "fa",
    );
    const relatedResult = await repository(
      relatedFetch as unknown as typeof fetch,
    ).getRelatedPosts({ locale: "fa", slug: "soil", limit: 2 });

    const { url: tagUrl } = firstCall(tagsFetch);
    const { url: relatedUrl } = firstCall(relatedFetch);

    expect(tagUrl.pathname).toBe("/api/blog/tags");
    expect(tagUrl.searchParams.get("locale")).toBe("fa");
    expect(relatedUrl.pathname).toBe("/api/blog/posts/soil/related");
    expect(relatedUrl.searchParams.get("limit")).toBe("2");
    expect(tagResult).toEqual(tags);
    expect(relatedResult).toHaveLength(1);
  });

  it("loads sitemap entries", async () => {
    const entries = [
      {
        slug: "soil-texture-triangle",
        locale: "en" as const,
        updatedAt: "2026-07-02T08:00:00.000Z",
        alternates: [
          { locale: "fa" as const, slug: "مثلث-بافت-خاک" },
          { locale: "en" as const, slug: "soil-texture-triangle" },
        ],
      },
    ];
    const fetchMock = vi.fn(async () => jsonResponse(entries));

    const result = await repository(fetchMock as unknown as typeof fetch).getSitemap(
      "en",
    );

    const { url } = firstCall(fetchMock);
    expect(url.pathname).toBe("/api/blog/sitemap");
    expect(url.searchParams.get("locale")).toBe("en");
    expect(result).toEqual(entries);
  });

  it("maps API errors to a typed repository error", async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({ error: { code: "server_error", message: "Backend exploded" } }, 500),
    );

    const error = await repository(fetchMock as unknown as typeof fetch)
      .listPosts({ locale: "fa" })
      .catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(BlogRepositoryError);
    expect(error).toMatchObject({
      code: "http_error",
      status: 500,
      apiCode: "server_error",
      message: "Backend exploded",
    });
  });

  it("rejects malformed payloads with a safe error and a log", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = vi.fn(async () => jsonResponse({ items: "not-an-array" }));

    const error = await repository(fetchMock as unknown as typeof fetch)
      .listPosts({ locale: "fa" })
      .catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(BlogRepositoryError);
    expect(error).toMatchObject({ code: "invalid_response" });
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("rejects invalid dates with invalid_response instead of crashing", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { content: _content, ...summary } = mockPosts[0];
    const fetchMock = vi.fn(async () =>
      jsonResponse({
        items: [{ ...summary, publishedAt: "not-a-date" }],
        page: 1,
        pageSize: 9,
        total: 1,
        totalPages: 1,
      }),
    );

    const error = await repository(fetchMock as unknown as typeof fetch)
      .listPosts({ locale: "fa" })
      .catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(BlogRepositoryError);
    expect(error).toMatchObject({ code: "invalid_response" });
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("rejects invalid JSON with invalid_response", async () => {
    const fetchMock = vi.fn(
      async () => new Response("<html>oops</html>", { status: 200 }),
    );

    await expect(
      repository(fetchMock as unknown as typeof fetch).getTags("fa"),
    ).rejects.toMatchObject({ code: "invalid_response" });
  });

  it("maps network failures to network_error", async () => {
    const fetchMock = vi.fn(async () => {
      throw new TypeError("fetch failed");
    });

    await expect(
      repository(fetchMock as unknown as typeof fetch).listPosts({ locale: "fa" }),
    ).rejects.toMatchObject({ code: "network_error" });
  });

  it("aborts slow requests with a timeout error", async () => {
    const abortableFetch = vi.fn(
      (_input: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          const fail = () =>
            reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
          if (init?.signal?.aborted) fail();
          else init?.signal?.addEventListener("abort", fail, { once: true });
        }),
    );
    const repo = new FastApiBlogRepository({
      baseUrl,
      timeoutMs: 5,
      fetchImpl: abortableFetch as unknown as typeof fetch,
    });

    await expect(repo.getTags("fa")).rejects.toMatchObject({ code: "timeout" });
  });
});

describe("createBlogRepository", () => {
  it("keeps the mock adapter when no base URL is configured", () => {
    expect(createBlogRepository({ BLOG_API_BASE_URL: "" })).toBeInstanceOf(
      MockBlogRepository,
    );
  });

  it("switches to the FastAPI adapter when a base URL is configured", () => {
    expect(
      createBlogRepository({ BLOG_API_BASE_URL: "https://api.example.test/blog" }),
    ).toBeInstanceOf(FastApiBlogRepository);
  });
});
