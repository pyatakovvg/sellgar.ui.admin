# AGENTS

## Зона ответственности

`@layout/app` владеет root application layout.

## Правила

- Держать здесь только app-level providers и shell-композицию.
- Не добавлять route-specific UI, data loading или mutations.
- Использовать layout contracts из `@tiyn/app`.
- Общие message/push providers подключать только если они нужны на уровне всего приложения.
