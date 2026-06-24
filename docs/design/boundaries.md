# Границы

## Host

`clients/admin` собирает приложение. Он владеет application startup, route tree, policies, initializers и host bindings.

Он не должен владеть feature tables, forms или mutation flows.

## Pages

`pages/*` владеют route screens. Page может открыть frame, но frame владеет своей form и mutations.

## Frames

`frames/*` владеют drawer/modal workflows. Frame должен быть цельным workflow: source, shell, controller, loader, view, requests и bindings.

## Widgets

`widgets/*` - embedded reusable UI. Widgets не заменяют frames.

## Libraries

- `library/domain` может знать о domain и HTTP.
- `library/design` должен оставаться visual и domain-free.
- `library/tiyn-app` владеет runtime behavior и меняется только когда этого требует app-level contract.

## UI Kit

Использовать `@sellgar/kit` как source components. Не дублировать local controls, если kit предоставляет нужный primitive.
