import type { BlogRepository } from "./application/ports/blog-repository";
import { FastApiBlogRepository } from "./infrastructure/fast-api-blog-repository";
import { MockBlogRepository } from "./infrastructure/mock-repository";

type BlogEnvironment = {
  BLOG_API_BASE_URL?: string;
  BLOG_API_TOKEN?: string;
};

/**
 * The composition root for the blog module. Routes import `blogRepository`
 * and never reach into infrastructure directly.
 */
export function createBlogRepository(
  environment: BlogEnvironment = typeof process !== "undefined" ? process.env : {},
): BlogRepository {
  const baseUrl = environment.BLOG_API_BASE_URL?.trim();

  if (!baseUrl) {
    return new MockBlogRepository();
  }

  return new FastApiBlogRepository({
    baseUrl,
    token: environment.BLOG_API_TOKEN,
  });
}

export const blogRepository = createBlogRepository();

export {
  BlogRepositoryError,
  isBlogRepositoryError,
} from "./application/blog-repository-error";
