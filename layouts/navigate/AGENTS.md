# AGENTS

## Зона ответственности

`@layout/navigate` владеет authenticated shell, sidebar и навигационным layout.

## Правила

- Sidebar state, menu structure и navigation spacing принадлежат этому пакету.
- Использовать sidebar/menu components из `@sellgar/kit`.
- Использовать SVG-иконки из `@sellgar/kit/icons`.
- Desktop/tablet поведение должно оставаться согласованным.
- Не добавлять page-specific loaders или mutations.
