# AGENTS

## Зона ответственности

`frames/*` владеют drawer/modal workflows.

## Правила

- Frames объявляются через `@Frame`, `FrameDefinition` и `HashFrameSource`, если frame hash-backed.
- Frame shell, controller, bindings, loader, requests и form view держать внутри frame-пакета.
- Открывать frames из pages через `useFrame(FrameClass)`.
- Для hash-frame edit loaders читать параметры открытия из `FrameControllerLoaderArgs<T>['props']`.
- Form state инициализировать из loader data при создании формы.
- После успешного create/update закрывать frame через `useFrame()`, если так устроен локальный workflow.

## Нельзя

- Не переносить frame forms обратно в widgets.
- Не чинить пустые значения формы через effect-based reset до проверки loader args и default values.
- Не импортировать page private internals из frame.
