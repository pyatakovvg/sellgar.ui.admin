# AGENTS.md

## Назначение

`runtime` содержит общие primitives: context, operation flow, runtime errors,
runtime providers, React scope context и runtime scopes.

## Границы

- Runtime scopes владеют DI lifetime для application, module, route, widget и
  frame.
- Runtime providers выполняются по phases и возвращают optional dispose
  handler.
- Runtime operation flow должен различать completed, failed и interrupted
  operations.
- Runtime errors дают единый канал для ошибок из initializer, route, frame,
  widget и view operations. Framework только публикует ошибку; доменную реакцию
  выбирает host/application layer.
- `RuntimeErrorsInterface.on(...)` допустим для подписки по class exception или
  predicate. `subscribe(...)` используется для общей интеграции вроде logging.
- `executeRuntimeOperation(...)` должен emit-ить ошибку до возврата failed или
  interrupted, чтобы application-level recovery видел любой runtime request.
- Не добавлять business state или фича-specific lifecycle.

## Проверка

- Operation/provider/scope изменения: локальные tests при наличии.
- Проверить module/widget/frame/router потребителей, если меняется shared runtime
  contract.
