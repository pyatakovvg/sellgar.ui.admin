# AGENTS

## Зона ответственности

`@page/properties` владеет route характеристик.

## Правила

- Loader списка характеристик, tables и page actions держать здесь.
- Для создания/редактирования характеристики открывать `PropertyModifyFrame`.
- Использовать текущий `Table` из `@sellgar/kit`.
