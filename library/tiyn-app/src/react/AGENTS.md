# AGENTS.md

## Назначение

`react` содержит React adapter layer: React Router adapter, route exception
context, pending boundary, navigation/location hooks, runtime error hooks и
renderable view helper.

## Границы

- React Router internals скрыты за adapter и services.
- Публичный фича code использует hooks/services из корня пакета.
- Adapter code не должен знать business domain или concrete route packages.
- Shared render helpers должны оставаться framework-level.
- `useRuntimeErrors`, `useRuntimeError` и `useRuntimeOperation` нужны view-слою,
  когда операция запускается из React, но ошибка должна пройти через общий
  runtime error bus. `useRuntimeError` подписывается только на class exception.

## Проверка

- Router adapter/hooks: локальные tests в `react/router`.
- Renderable view: tests в `react/view`.
- Проверить `src/router` потребителей при изменении adapter boundary.
