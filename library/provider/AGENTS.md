# Reusable Runtime Providers

## Назначение

`@library/provider` содержит законченные integration units между concrete
Socket.IO Hub, domain entity и lifecycle providers из `@sellgar/app`.

## Границы

- Один provider живёт в `src/<provider>/` и экспортируется через package facade.
- Provider получает Hub через локальный abstract token и не создаёт transport connection.
- Hub владеет URL, product event name, product-specific payload и вызовом listener-а.
- Общий realtime delivery envelope и channel принадлежат `@library/socket-io`.
- Порядок delivery, ACK и reconnect принадлежат `@library/socket-io`.
- Физический connection lifecycle и reconnect принадлежат `@library/socket-io`.
- Глобальные transport providers используют `@SingletonProvider()` и возвращают cleanup.
- Provider подключает transport и собственные bindings через `@UseBindings()`.
- Transport DTO и concrete Hub не экспортируются из package facade.

## Проверка

```bash
yarn test library/provider/src
yarn tsc -p library/provider/tsconfig.json --noEmit
yarn build:admin_ui
```
