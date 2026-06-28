# AGENTS

## Зона ответственности

`@frame/store-modify` владеет drawer-frame создания и редактирования складской позиции.

## Runtime-Контракт

- Hash source: `store`.
- Shell: drawer.
- Открывается из `@page/store` через `useFrame(StoreModifyFrame)`.

## Правила

- Store form, loader, auxiliary hooks, create/update requests и bindings держать внутри этого пакета.
- Edit loaders должны читать `uuid` из frame open props.
- При изменении workflow сохранять секции prices, shop, currency и variant.
- Currency выбирается как бизнес-сущность `currency`; не вводить
  UI-специфичные аналоги вроде `shopCurrency` или `variantCurrency`.
- Price history отображает историю цен предложения store, а не цену catalog
  product/variant.
- Не использовать sticky page layout внутри list workflow `/store`.
