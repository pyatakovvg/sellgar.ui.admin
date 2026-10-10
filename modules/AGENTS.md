# AGENTS

## Зона ответственности

`modules/*` владеют route-level экранами.

## Правила

- Module загружается route-конфигурацией в `AdminApplication`.
- Modules объявляются через `@Module` и локальный `@UseBindings`.
- Module controllers, interfaces и bindings держать в `src/classes`.
- Loader data читать через `useLoaderData(ControllerInterface)`.
- Для drawer/modal create-edit workflows использовать frames.
- Для списковых таблиц использовать текущий `Table` из `@sellgar/kit`.
- Если table row представляет редактируемую сущность, primary open/edit action должен быть на row click.

## Нельзя

- Не импортировать private files другого module-пакета.
- Не реализовывать drawer/modal формы как module-local widgets.
- Не добавлять host-level bindings для module-local controllers.
