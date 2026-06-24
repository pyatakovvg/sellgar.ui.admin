# AGENTS

## Зона ответственности

`clients/admin` - host-приложение и composition root.

## Владеет

- Запуск приложения: `src/main.tsx`, `src/bootstrap.tsx`.
- Композиция runtime: `src/application/admin.application.tsx`.
- Host-level bindings: `src/application/bindings`.
- Auth policies маршрутов: `src/application/policies`.
- Initializers приложения: `src/application/initializers`.
- UI service worker: `src/sw`.
- Глобальные стили: `src/styles/index.css`.

## Правила

- Не добавлять сюда feature UI и business logic.
- Здесь только регистрируются pages и frames; реализация живет в `pages/*` или `frames/*`.
- Для routing, policies и application composition использовать primitives из `@tiyn/app`.
- Host bindings ограничивать application-wide/domain infrastructure.
