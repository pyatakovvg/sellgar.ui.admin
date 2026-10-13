# AGENTS

## Зона ответственности

`@frame/store-inventory` владеет nested drawer workflow ручного управления остатком одной учётной записи варианта.

## Runtime-Контракт

- Route token: `StoreInventoryRoute`.
- Shell: общий application-level Drawer.
- Открывается из вложенной таблицы offer-ов на странице `@module/store` через tokenized navigation.

## Правила

- Module получает `storeProductUuid` и `recordUuid` из route params.
- Loader загружает store product, находит вариант и его учётную запись и отдает модалке товар, магазин, вариант и inventory.
- Форма не обновляет `store_product` или `store_offer`; она вызывает только inventory-команды `adjust`, `receipt`, `writeOff`.
- Количество относится к `record.inventory`, а не к catalog variant и не к форме `store-modify`.
