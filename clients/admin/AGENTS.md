# AGENTS

## Зона ответственности

`clients/admin` - host-приложение и composition root.

## Владеет

- Запуск приложения: `src/main.tsx`, `src/bootstrap.tsx`.
- Композиция runtime: `src/application/admin.application.tsx`.
- Host-level bindings: `src/application/bindings`.
- Auth policies маршрутов: `src/application/policies`.
- Initializers приложения: `src/application/initializers`.
- Application-level presentations: `src/application/presentations`.
- UI service worker: `src/sw`.
- Глобальные стили: `src/styles/index.css`.

## Правила

- Не добавлять сюда feature UI и business logic.
- Здесь только регистрируются pages и frames; реализация живет в `pages/*` или `frames/*`.
- Для routing, policies и application composition использовать primitives из `@tiyn/app`.
- Host bindings ограничивать application-wide/domain infrastructure.
- Runtime recovery подключать в initializer через `RuntimeErrorsInterface`, а не
  через domain/request abstractions. Конкретная реакция на 401, логирование или
  внешние репортеры принадлежат host application.
- Диалоги host-level user request строить через `UserRequestFeature` и
  components из `@sellgar/kit`, не через самописные overlays.
