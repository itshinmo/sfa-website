FROM node:24-alpine AS base
ENV COREPACK_HOME=/usr/local/share/corepack
RUN mkdir -p "$COREPACK_HOME" \
  && corepack enable \
  && corepack prepare pnpm@12.11.2 --activate \
  && chmod -R a+rX "$COREPACK_HOME"
WORKDIR /app

FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS build
COPY . .
RUN pnpm build

FROM base AS production-dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/build ./build
COPY --chown=node:node package.json ./
RUN chown -R node:node /usr/local/share/corepack
EXPOSE 3000
USER node
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/robots.txt').then((res) => process.exit(res.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["pnpm", "start"]
