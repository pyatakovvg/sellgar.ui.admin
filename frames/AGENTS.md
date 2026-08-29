# AGENTS

## Зона ответственности

`frames/*` владеют nested drawer workflows.

## Правила

- Frame package объявляет renderer-модуль через `@Module` и подключает bindings через `@UseBindings`.
- Shell, controller, bindings, loader, requests и form view держать внутри frame-пакета.
- Открывать frames из pages через `NavigateServiceInterface`/`useNavigate()` и route token.
- Параметры loader/action читать из `args.params`; тип выводить через `RouteParams<typeof RouteToken>`.
- Form state инициализировать из loader data при создании формы.
- После успешного create/update закрывать nested Router через `navigate.close()`.

## Нельзя

- Не переносить frame forms обратно в widgets.
- Не чинить пустые значения формы через effect-based reset до проверки loader args и default values.
- Не импортировать page private internals из frame.
