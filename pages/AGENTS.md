# AGENTS

## Зона ответственности

`pages/*` владеют route-level экранами.

## Правила

- Page загружается route-конфигурацией в `AdminApplication`.
- Pages объявляются через `@Module` и локальный `@UseBindings`.
- Page controllers, interfaces и bindings держать в `src/classes`.
- Loader data читать через `useLoaderData(ControllerInterface)`.
- Для drawer/modal create-edit workflows использовать frames.
- Для списковых таблиц использовать текущий `Table` из `@sellgar/kit`.
- Если table row представляет редактируемую сущность, primary open/edit action должен быть на row click.

## Нельзя

- Не импортировать private files другого page-пакета.
- Не реализовывать drawer/modal формы как page-local widgets.
- Не добавлять host-level bindings для page-local controllers.
