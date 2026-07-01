# Архитектура Админки Sellgar

## Корень Композиции

`clients/admin` - единственный host приложения.

- `src/main.tsx` подключает `@sellgar/kit/icons.css`, шрифт, тему и глобальные стили.
- `src/bootstrap.tsx` создает `AdminApplication`, вызывает `compose()`, рендерит view и запускает `initialize()`.
- `src/application/admin.application.tsx` задает layouts, route policies, initializers, components и дерево маршрутов.
- `src/application/bindings/admin.bindings.ts` регистрирует host-level dependencies: auth/session, repositories, API clients и application services.

Host не должен становиться местом для feature UI или feature business logic. Он только связывает packages.

## Runtime

Приложение использует `@tiyn/app`.

- `Application` собирает runtime.
- `Route` и `Router` задают route tree.
- `@Module` описывает route-level страницу.
- `@Frame` описывает drawer/modal workflow.
- `@UseBindings` подключает DI bindings к application, page, frame или widget.
- Policies на route выполняют auth-gating.

## Маршруты

Публичная ветка:

- `/sign-in` -> `@page/sign-in`, доступен только для anonymous session.

Приватная ветка под `NavigateLayout`:

- `/` -> `@page/dashboard`;
- `/shops` -> `@page/shop`;
- `/products` -> `@page/products`;
- `/products/create` -> `@page/product-modify`;
- `/products/:uuid` -> `@page/product-modify`;
- `/store` -> `@page/store`, frame `@frame/store-modify`;
- `/brands` -> `@page/brands`, frame `@frame/brand-modify`;
- `/categories` -> `@page/categories`, frame `@frame/category-modify`;
- `/units` -> `@page/units`, frame `@frame/unit-modify`;
- `/properties` -> `@page/properties`, frames `@frame/property-modify` и `@frame/property-group-modify`.

## Границы пакетов

- `pages/*` владеют route-level экранами и списками.
- `frames/*` владеют drawer/modal формами и их loader/mutation процессом.
- `widgets/*` владеют маленькими reusable blocks, которые встраиваются в layout/page/frame.
- `layouts/*` владеют общим каркасом экрана.
- `library/domain` владеет domain entities, repositories, API clients и HTTP helper.
- `library/design` - shared UI wrappers только без domain imports.
- `library/tiyn-app` - локальный runtime package.
- `utils/*` - чистые утилиты.

## Поток Данных

1. Route или frame подключает controller через bindings.
2. Controller loader получает данные и возвращает их runtime.
3. View читает данные через `useLoaderData(ControllerInterface)`.
4. Forms получают начальные значения из loader data на этапе создания формы.
5. Mutations вызываются из requests/hooks через `useController`.
6. После успешной mutation view закрывает frame или выполняет navigation/revalidate по локальному contract.

Для hash frames параметры открытия находятся в `args.props`. Это важно для edit forms: если читать `uuid` из route params, данные могут загрузиться не для того source или не попасть в форму.
