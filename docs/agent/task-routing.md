# Маршрутизация Задач

Этот файл помогает выбрать место для изменения.

## Запуск приложения, routes, auth gates

Работать в `clients/admin/src/application`.

Примеры:

- добавить или удалить route;
- подключить новый frame к route;
- изменить auth policies;
- зарегистрировать application-wide bindings.

## Route screen

Работать в `pages/<feature>`.

Примеры:

- list page с таблицей;
- page filters/header/content;
- route loader для list/details page;
- route-level form page, например product modify.

## Drawer или modal workflow

Работать в `frames/<feature>`.

Примеры:

- create/edit brand;
- create/edit category;
- create/edit unit;
- create/edit property или property group;
- create/edit store item через hash frame.

## Встраиваемый reusable block

Работать в `widgets/<name>`.

Примеры:

- logout control;
- gallery UI, переиспользуемый page/form.

Не помещать drawer/modal feature workflows в widgets.

## Общие UI, domain и runtime

- `library/design` - только visual shared wrappers.
- `library/domain` - entities, repositories, API clients и HTTP helpers.
- `library/tiyn-app` - runtime changes.
- `utils/*` - pure utility functions.
