export const BLOG_REPOSITORY_ERROR_CODES = [
  "http_error",
  "network_error",
  "timeout",
  "invalid_response",
] as const;

export type BlogRepositoryErrorCode = (typeof BLOG_REPOSITORY_ERROR_CODES)[number];

type BlogRepositoryErrorOptions = {
  status?: number;
  apiCode?: string;
  cause?: unknown;
};

/**
 * Safe, code-based errors raised by infrastructure adapters. Loaders can map
 * these to a localized error state without leaking response bodies or tokens.
 */
export class BlogRepositoryError extends Error {
  readonly code: BlogRepositoryErrorCode;
  readonly status?: number;
  readonly apiCode?: string;

  constructor(
    code: BlogRepositoryErrorCode,
    message: string,
    options: BlogRepositoryErrorOptions = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "BlogRepositoryError";
    this.code = code;
    this.status = options.status;
    this.apiCode = options.apiCode;
  }
}

export function isBlogRepositoryError(error: unknown): error is BlogRepositoryError {
  return error instanceof BlogRepositoryError;
}
