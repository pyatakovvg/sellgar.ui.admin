# AGENTS

## Зона ответственности

`@frame/shop-modify` владеет drawer-frame создания и редактирования магазина.

## Runtime-Контракт

- Hash source: `shop`.
- Shell: drawer.
- Открывается из `@page/shops` через `useFrame(ShopModifyFrame)`.

## Правила

- Form магазина, loader, create/update requests и bindings держать внутри этого пакета.
- Edit loaders должны читать `uuid` из frame open props.
- После успешного сохранения закрывать frame и обновлять owning list по текущему локальному паттерну.
