# Границы

## Host

`clients/admin` собирает приложение. Он владеет application startup, route tree, policies, initializers и host bindings.

Он не должен владеть feature tables, forms или mutation flows.

## Pages

`pages/*` владеют route screens. Page может открыть frame, но frame владеет своей form и mutations.

## Frames

`frames/*` владеют nested Drawer workflows. Frame должен быть цельным workflow: controller, loader, view, requests и bindings. Общий shell принадлежит application host.

## Widgets

`widgets/*` - embedded reusable UI. Widgets не заменяют frames.

## Libraries

- `library/domain` может знать о domain и HTTP.
- `library/design` должен оставаться visual и domain-free.
- `library/tiyn-app-v2` владеет runtime behavior и меняется только когда этого требует app-level contract.
- `library/route-tokens` владеет route token contracts.

## UI Kit

Использовать `@sellgar/kit` как source components. Не дублировать local controls, если kit предоставляет нужный primitive.
