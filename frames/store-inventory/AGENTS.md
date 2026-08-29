# AGENTS

## Зона ответственности

`@frame/store-inventory` владеет nested drawer workflow ручного управления остатком одного store offer.

## Runtime-Контракт

- Route token: `StoreInventoryRoute`.
- Shell: общий application-level Drawer.
- Открывается из вложенной таблицы offer-ов на странице `@page/store` через tokenized navigation.

## Правила

- Module получает `storeProductUuid` и `offerUuid` из route params.
- Loader загружает store product, находит offer и отдает модалке товар, магазин, вариант и inventory.
- Форма не обновляет `store_product` или `store_offer`; она вызывает только inventory-команды `adjust`, `receipt`, `writeOff`.
- Количество относится к `offer.inventory`, а не к catalog variant и не к форме `store-modify`.
