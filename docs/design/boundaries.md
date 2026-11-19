# Границы

## Host

`code/clients/admin` собирает приложение. Он владеет application startup, route tree, policies, initializers и host bindings.

Он не должен владеть feature tables, forms или mutation flows.

## Pages

`code/modules/*` владеют route screens. Page может открыть frame, но frame владеет своей form и mutations.

## Frames

`code/frames/*` владеют nested Drawer workflows. Frame должен быть цельным workflow: controller, loader, view, requests и bindings. Общий shell принадлежит application host.

## Widgets

`code/widgets/*` - embedded reusable UI. Widgets не заменяют frames.

## Libraries

- `code/library/domain` может знать о domain и HTTP.
- `code/library/design` должен оставаться visual и domain-free.
- `code/library/sellgar.app.ui` владеет runtime behavior и меняется только когда этого требует app-level contract.
- `code/library/route-tokens` владеет route token contracts.

## UI Kit

Использовать `@sellgar/kit` как source components. Не дублировать local controls, если kit предоставляет нужный primitive.
