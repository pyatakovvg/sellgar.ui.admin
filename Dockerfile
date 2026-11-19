# syntax=docker/dockerfile:1
FROM node:24-bookworm-slim@sha256:dc26ae92c9fb15cf6b1d63e20f0944b2efe0f115b20e00be48fb23fceb061c54 AS builder

WORKDIR /app/code

RUN corepack enable

COPY code/ ./

RUN yarn install --immutable
RUN yarn build:admin_ui

FROM nginx:1.30.7-alpine@sha256:bef154735288bc38d99fac41ae63730684bcc661503673a04a0f9bc526ba8598 AS runtime

COPY code/clients/admin/nginx/nginx.conf /etc/nginx/nginx.conf
COPY code/clients/admin/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/code/clients/admin/build/ /usr/share/nginx/html/admin/

USER nginx

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
