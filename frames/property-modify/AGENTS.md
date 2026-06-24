# AGENTS

## Зона ответственности

`@frame/property-modify` владеет drawer-frame создания и редактирования характеристики.

## Runtime-Контракт

- Hash source: `property`.
- Shell: drawer.
- Открывается из `@page/properties` через `useFrame(PropertyModifyFrame)`.

## Правила

- Form характеристики, loader, create/update requests и bindings держать внутри этого пакета.
- Edit loaders должны читать `uuid` из frame open props.
- Property group lookup и options держать frame-local, если они не стали shared domain behavior.
