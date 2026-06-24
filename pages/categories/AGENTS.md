# AGENTS

## Зона ответственности

`@page/categories` владеет route списка категорий.

## Правила

- Loader списка категорий, table и header держать здесь.
- Для create/edit actions открывать `CategoryModifyFrame`.
- Использовать текущий `Table` из `@sellgar/kit`.
- При изменении table cells сохранять отображение category hierarchy.
