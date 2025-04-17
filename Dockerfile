FROM node:23-alpine as builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package*.json .
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:23-alpine

ENV NODE_ENV=production
USER node

WORKDIR /app

COPY --from=builder /app/build /app/build/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY package.json .

EXPOSE 3000

CMD [ "node", "build" ]
