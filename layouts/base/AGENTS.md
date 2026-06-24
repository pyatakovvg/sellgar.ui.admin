# AGENTS

## Зона ответственности

`@layout/base` владеет базовым публичным shell для public routes.

## Правила

- Layout должен оставаться минимальным и route-agnostic.
- Authenticated navigation/sidebar сюда не относится.
- Не добавлять feature data loading или mutations.
- Для layout-only стилей использовать локальные CSS modules.
