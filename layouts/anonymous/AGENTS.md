# AGENTS

## Зона ответственности

`@layout/anonymous` владеет shell неавторизованной зоны.

## Правила

- Layout должен оставаться минимальным и route-agnostic.
- Authenticated navigation/sidebar сюда не относится.
- Не добавлять feature data loading или mutations.
- Для layout-only стилей использовать локальные CSS modules.

## Структура

- `src/anonymous.layout.ts` — только declaration и metadata лейаута.
- `src/view/layout.view.tsx` — React-композиция shell.
- `src/view/default.module.scss` — стили view.
- `src/index.ts` экспортирует только `AnonymousLayout`; view остаётся внутренней.
