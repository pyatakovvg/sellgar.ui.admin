# AGENTS

## Зона ответственности

`@page/products` владеет route списка товаров.

## Правила

- Loader списка товаров, table и header держать здесь.
- Для edit переходить на `/products/:uuid`, для create - на `/products/create`.
- Использовать текущий `Table` из `@sellgar/kit`.
- Row click является primary open/edit action для product rows.
