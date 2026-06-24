# AGENTS

## Зона ответственности

`@library/design` владеет shared visual wrappers.

## Правила

- Пакет должен оставаться domain-free.
- Не импортировать pages, frames, widgets, layouts или domain services.
- Предпочитать primitives из `@sellgar/kit` вместо custom duplicated UI.
- Добавлять components только если они реально shared между несколькими владельцами.
