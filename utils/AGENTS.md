# AGENTS

## Зона ответственности

`utils/*` владеют чистыми reusable utilities.

## Текущие пакеты

- `utils/format` - formatting helpers.
- `utils/generate` - generation helpers.

## Правила

- Utilities должны оставаться framework-light и UI-free, если пакет явно не владеет UI generation.
- Не импортировать pages, frames, widgets или layouts.
- Публичные exports держать в `src/index.ts`.
- Предпочитать узкие helpers вместо shared business logic.
