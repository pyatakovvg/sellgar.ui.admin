# AGENTS

## Зона ответственности

`@frame/brand-modify` владеет drawer-frame создания и редактирования бренда.

## Runtime-Контракт

- Hash source: `brand`.
- Shell: drawer.
- Открывается из `@page/brands` через `useFrame(BrandModifyFrame)`.

## Правила

- Form бренда, loader, create/update requests и bindings держать внутри этого пакета.
- Edit loaders должны читать `uuid` из frame open props.
- После успешного сохранения закрывать frame и обновлять owning list по текущему локальному паттерну.
