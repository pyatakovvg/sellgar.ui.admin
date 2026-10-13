# AGENTS

## Зона ответственности

`@frame/store-modify` владеет drawer-frame создания и редактирования складской позиции.

## Runtime-Контракт

- Route tokens: `StoreCreateRoute`, `StoreModifyRoute`.
- Shell: общий application-level Drawer.
- Открывается из `@module/store` через tokenized navigation.

## Правила

- Store form, loader, auxiliary hooks, create/update requests и bindings держать внутри этого пакета.
- Edit loaders читают `uuid` из route params.
- При изменении workflow сохранять секции prices, shop, currency и variant.
- Currency выбирается как бизнес-сущность `currency`; не вводить
  UI-специфичные аналоги вроде `shopCurrency` или `variantCurrency`.
- Price history отображает историю цен предложения store, а не цену catalog
  product/variant.
- Не использовать sticky page layout внутри list workflow `/store`.

- Форма редактирует цену и видимость варианта. Учётные записи сохраняются сервисом, когда `records` не переданы; для нового варианта сервис создаёт запись по умолчанию. Остатки показаны по записям и открываются через `recordUuid`.
