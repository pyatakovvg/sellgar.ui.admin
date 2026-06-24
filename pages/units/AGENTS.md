# AGENTS

## Зона ответственности

`@page/units` владеет route списка единиц измерения.

## Правила

- Loader списка единиц измерения, table и header держать здесь.
- Для create/edit actions открывать `UnitModifyFrame`.
- Использовать текущий `Table` из `@sellgar/kit`.
- Row click является primary edit/open action для unit rows.
