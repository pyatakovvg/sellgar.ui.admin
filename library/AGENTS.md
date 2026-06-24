# AGENTS

## Зона ответственности

`library/*` - shared layers, которые используются clients/features.

## Пакеты

- `library/domain` - domain entities, repositories, API clients и HTTP helpers.
- `library/design` - только shared visual wrappers.
- `library/message` - message/notification integration.
- `library/push` - push/service-worker helpers.
- `library/tiyn-app` - локальный app runtime.

## Правила

- Публичные exports держать в `src/index.ts` каждого пакета.
- `library/design` должен оставаться domain-free.
- Не импортировать pages, frames, widgets или layouts из libraries.
- `library/tiyn-app` менять только если меняется сам runtime contract.
- Feature-specific поведение добавлять в owning page/frame/widget, а не в shared libraries.
