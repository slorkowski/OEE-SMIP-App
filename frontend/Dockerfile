FROM oven/bun:alpine AS build

ENV NODE_ENV=production
WORKDIR /build

# Install Dependencies
COPY package.json bun.lockb /build/
RUN ["bun", "install", "--frozen-lockfile"]
# Build Application
COPY . /build/
RUN ["bun", "run", "predev"]
RUN ["bun", "run", "build"]



FROM oven/bun:alpine AS production

ENV NODE_ENV=production
WORKDIR /app

# Install Production Dependencies
COPY package.json bun.lockb /app/
RUN ["bun", "install", "--production", "--frozen-lockfile"]
# Copy server over from build
COPY --from=build /build/.output /app

ENTRYPOINT [ "bun" ]
CMD [ "run", "/app/server/index.mjs" ]
