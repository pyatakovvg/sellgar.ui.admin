# AGENTS

## Зона ответственности

`modules/*` владеют route-level экранами.

## Правила

- Module загружается route-конфигурацией в `AdminApplication`.
- Modules объявляются через `@Module` и локальный `@UseBindings`.
- Module controllers, interfaces и bindings держать в `src/classes`.
- Loader data читать через `useLoaderData(ControllerInterface)`.
- Для drawer/modal create-edit workflows использовать frames.
- Для списковых таблиц использовать новый `Table` из `@sellgar/kit/table`.
- Передавать `loading` из `useRevalidate().inProcess`: индикатор отражает выполнение загрузчиков текущего runtime, включая фильтрацию и обновление. Вложенные таблицы читают состояние своего runtime; до mount Table первоначальную загрузку показывает module fallback.
- Модуль не знает, на каком маршруте он размещён. Не использовать токен собственного маршрута и `useRoutePending` для состояния загрузки модуля; route graph принадлежит application host.
- Если table row представляет редактируемую сущность, primary open/edit action должен быть на row click.

## Нельзя

- Не импортировать private files другого module-пакета.
- Не реализовывать drawer/modal формы как module-local widgets.
- Не добавлять host-level bindings для module-local controllers.
