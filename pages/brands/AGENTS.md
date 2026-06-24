# AGENTS

## Зона ответственности

`@page/brands` владеет route списка брендов.

## Правила

- Loader списка, table и header держать здесь.
- Для create/edit actions открывать `BrandModifyFrame`.
- Использовать текущий `Table` из `@sellgar/kit`.
- Row click является primary edit/open action для brand rows.
