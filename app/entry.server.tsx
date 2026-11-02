import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { I18nextProvider } from "react-i18next";
import { ServerRouter } from "react-router";
import type { EntryContext, RouterContextProvider } from "react-router";
import { getInstance } from "./middleware/i18next";

export const streamTimeout = 5_000;

const PUBLIC_CACHE = "public, max-age=0, s-maxage=300, stale-while-revalidate=3600";

function cacheControlFor(request: Request, status: number) {
  if (status >= 400) return "no-store";
  if (request.method !== "GET" && request.method !== "HEAD") return "no-store";

  const url = new URL(request.url);

  if (url.pathname === "/design-lab" || url.pathname.startsWith("/design-lab/")) {
    return "no-store";
  }

  if (url.searchParams.has("q") || url.searchParams.has("tag")) {
    return "no-store";
  }

  return PUBLIC_CACHE;
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  entryContext: EntryContext,
  routerContext: RouterContextProvider,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");

    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || entryContext.isSpaMode
        ? "onAllReady"
        : "onShellReady";

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={getInstance(routerContext)}>
        <ServerRouter context={entryContext} url={request.url} />
      </I18nextProvider>,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set(
            "Cache-Control",
            cacheControlFor(request, responseStatusCode),
          );

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) console.error(error);
        },
      },
    );

    setTimeout(abort, streamTimeout + 1000);
  });
}
