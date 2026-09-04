# Маршрутизация Задач

Этот файл помогает выбрать место для изменения.

## Запуск приложения, routes, auth gates

Работать в `clients/admin/src/application`.

Примеры:

- добавить или удалить route;
- подключить новый nested frame router к route;
- изменить auth policies;
- зарегистрировать application-wide bindings.

## Route screen

Работать в `pages/<feature>`.

Примеры:

- list page с таблицей;
- page filters/header/content;
- route loader для list/details page;
- route-level form page, например product modify.

## Drawer workflow

Работать в `frames/<feature>`.

Примеры:

- create/edit brand;
- create/edit category;
- create/edit unit;
- create/edit property или property group;
- create/edit store item через tokenized nested route.

Все feature frames используют общий application-level `Drawer`. Отдельный Modal shell не создавать; kit `Modal` допустим для confirmation/user-request overlays.

## Встраиваемый reusable block

Работать в `widgets/<name>`.

Примеры:

- logout control;
- gallery UI, переиспользуемый page/form.

Не помещать drawer feature workflows в widgets.

## Общие UI, domain и runtime

- `library/design` - только visual shared wrappers.
- `library/domain` - entities, repositories, API clients и HTTP helpers.
- `library/sellgar.app.ui` - runtime changes.
- `library/route-tokens` - route token contracts.
- `utils/*` - pure utility functions.
