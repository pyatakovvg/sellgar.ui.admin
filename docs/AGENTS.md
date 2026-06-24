# AGENTS

## Зона ответственности

`docs/*` содержит проектную, разработческую, design и агентскую документацию.

## Правила

- Вся документация пишется на русском языке.
- Документация должна совпадать с текущими paths и package names репозитория.
- Использовать `clients/admin`, `pages/*`, `frames/*`, `widgets/*`, `layouts/*`, `library/*`.
- В примерах использовать `@sellgar/kit` и `@tiyn/app`.
- Не возвращать устаревшие host paths, obsolete feature aliases или старые package names UI-kit.
- Документация должна быть короткой и операционной.

## Проверка

Для docs-only changes использовать task-specific `rg` query по copied host names, old aliases и unrelated domain routes.
