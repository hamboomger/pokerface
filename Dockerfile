FROM node:23

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package*.json .
RUN pnpm install
COPY . .
RUN pnpm run build

EXPOSE 3000
# ENV NODE_ENV=production
ENV ORIGIN=http://localhost:3000

CMD [ "node", "build" ]
