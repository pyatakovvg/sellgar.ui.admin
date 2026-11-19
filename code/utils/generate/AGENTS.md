# AGENTS

## Зона ответственности

`@utils/generate` владеет generation helpers.

## Правила

- Helpers должны быть deterministic, если function явно не генерирует random values.
- Не импортировать UI feature packages.
- Shape генерируемого значения должен быть понятен из public export или имени function.
