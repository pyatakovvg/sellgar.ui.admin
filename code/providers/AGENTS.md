# Runtime providers

## Назначение

`providers/*` — отдельный слой монорепы. Каждый переиспользуемый runtime provider
принадлежит самостоятельному пакету `@provider/<name>` с собственными зависимостями,
bindings, внутренними адаптерами и тестами.

## Границы

- Публичный фасад каждого пакета — `src/index.ts`; он экспортирует только provider.
- Provider подключается через `providers: [...]` в декларации framework-единицы.
- Application provider использует `@Provider({ lifetime: 'application' })`.
- Provider получает Hub через локальный abstract token и не создаёт transport connection.
- Hub владеет URL, именами событий, их payload и вызовом listener-а.
- Если delivery требует route-specific context, конкретный Hub подписывается на
  location и обновляет context только принадлежащего событию delivery lease.
  Общий transport provider не подписывается на location.
- Общий realtime delivery envelope и channel принадлежат `@library/socket-io`.
- Порядок delivery, ACK, connection lifecycle и reconnect принадлежат `@library/socket-io`.
- Provider подключает transport и собственные bindings через `@UseBindings()`.
- Каждая подписка возвращает cleanup; его выполняет framework.
- Transport DTO и concrete Hub не экспортируются из package facade.
- Общего пакета, объединяющего все providers, нет. Потребитель зависит от нужного provider.

## Проверки

Из корня репозитория:

```bash
yarn test providers
yarn tsc -p providers/product-changes/tsconfig.json --noEmit
yarn tsc -p providers/store-offer-changes/tsconfig.json --noEmit
yarn build:admin_ui
```
