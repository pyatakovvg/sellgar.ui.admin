# AGENTS.md

## Назначение

`runtime` содержит общие primitives: context, operation flow, runtime providers,
React scope context и runtime scopes.

## Границы

- Runtime scopes владеют DI lifetime для application, module, route, widget и
  frame.
- Runtime providers выполняются по phases и возвращают optional dispose
  handler.
- Runtime operation flow должен различать completed, failed и interrupted
  operations.
- Не добавлять business state или фича-specific lifecycle.

## Проверка

- Operation/provider/scope изменения: локальные tests при наличии.
- Проверить module/widget/frame/router потребителей, если меняется shared runtime
  contract.
