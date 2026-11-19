# AGENTS

## Зона ответственности

`@utils/format` владеет чистыми formatting helpers.

## Правила

- Helpers должны быть deterministic и UI-free.
- Не импортировать feature packages или domain services.
- Для нетривиальных edge cases formatting добавлять tests при изменении behavior.
