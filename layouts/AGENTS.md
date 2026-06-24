# AGENTS

## Зона ответственности

`layouts/*` владеют shells приложения и общей layout-композицией.

## Текущие пакеты

- `layouts/app` - root app layout и providers.
- `layouts/base` - базовый публичный shell.
- `layouts/navigate` - authenticated shell, sidebar и область навигации.

## Правила

- Поведение sidebar принадлежит `layouts/navigate`.
- Использовать layout/navigation components из `@sellgar/kit`.
- Использовать SVG-иконки из `@sellgar/kit/icons`.
- Не добавлять в layouts page-specific data loading или mutations.
- Любые layout-изменения должны оставаться совместимыми со всеми private routes.
