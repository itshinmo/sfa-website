import { estimateReadingTimeMinutes } from "../domain/reading-time";
import type { BlogPost } from "../domain/post";
import rawPosts from "./mock-posts.json";

/**
 * Local fallback fixtures. The JSON stays close to the public API contract so
 * long-form content, multiple image blocks, and translations can be exercised
 * without a running backend. Reading time is derived from the article body
 * instead of being trusted to a hand-written estimate.
 */
export const mockPosts: BlogPost[] = (rawPosts as BlogPost[]).map((post) => ({
  ...post,
  readingTimeMinutes: estimateReadingTimeMinutes(post.content),
}));
