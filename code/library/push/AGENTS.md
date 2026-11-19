# AGENTS

## Зона ответственности

`@library/push` владеет shared push/service-worker support.

## Правила

- Browser push и service-worker helpers должны оставаться application-safe.
- Не импортировать modules, frames, widgets или layouts.
- Регистрация и UI обновлений service worker принадлежат `@feature/service-worker` в `features/service-worker`.
