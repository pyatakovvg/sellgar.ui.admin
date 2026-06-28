# AGENTS

## Зона ответственности

`@page/store` владеет route списка складских позиций `/store`.

## Правила

- Loader списка складских позиций, table и header держать здесь.
- Для create/edit actions открывать `StoreModifyFrame`.
- Использовать текущий `Table` из `@sellgar/kit`.
- Row click является primary edit/open action для rows складских позиций.
- Данные store list приходят из `store_srv` через admin gateway. Не тянуть
  price/currency/store данные из product domain.
- Не оборачивать эту страницу в sticky layout без redesign route-level scroll contract.
