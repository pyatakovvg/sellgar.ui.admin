# AGENTS.md

## Назначение

`runtime` содержит общие primitives: context, operation flow, runtime errors,
runtime providers, React scope context и runtime scopes.

## Границы

- Runtime scopes владеют DI lifetime для application, provider, module, route,
  widget и frame. `ProviderScope` является соседней runtime-веткой и не должен
  наследовать bindings module/frame/widget.
- Runtime providers выполняются по phases и возвращают optional dispose
  handler. `setup` выполняется один раз на lifetime pipeline; повторные
  loader/revalidate его не повторяют, а cleanup вызывается при dispose owner
  runtime.
- Route declaration adapter может повторно активироваться после dispose
  предыдущего route provider pipeline. Каждая новая активация создаёт новый
  pipeline; освобождённый pipeline повторно не используется.
- Singleton providers имеют отдельные `@SingletonProvider()` и
  `SingletonProviderInterface`. Они не получают runtime context, реализуют
  только обязательный `setup` и сохраняют общий `RuntimeProviderResult`.
  `ProviderScope` создаёт один singleton instance на application, первый
  активный lease запускает setup, последний — cleanup.
- Provider подключает собственные dependencies через `@UseBindings`. Общий
  `ProviderScope` удерживает binding modules по constructor identity, а каждый
  runtime pipeline получает отдельный runtime provider instance и локальный
  context. Singleton provider instance и его bindings живут до dispose
  application scope.
- Runtime operation flow должен различать completed, failed и interrupted
  operations.
- Runtime errors дают единый канал для всех ошибок из initializer, route, frame,
  widget и view operations. Framework только публикует ошибку; доменную реакцию
  выбирает host/application layer.
- `RuntimeErrorsInterface.on(...)` допустим только для подписки по class
  exception. `subscribe(...)` используется для общей интеграции вроде logging.
- `RuntimeErrorsInterface.emit(...)` await-able. Долгие logging/analytics
  handlers сами должны запускать тяжёлую работу без блокировки runtime flow.
- `executeRuntimeOperation(...)` должен emit-ить ошибку до возврата failed или
  interrupted, чтобы application-level recovery видел любой runtime request.
- Не добавлять business state или фича-specific lifecycle.

## Проверка

- Operation/provider/scope изменения: локальные tests при наличии.
- Проверить module/widget/frame/router потребителей, если меняется shared runtime
  contract.
