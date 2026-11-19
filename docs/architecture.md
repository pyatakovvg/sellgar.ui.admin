# Архитектура Админки Sellgar

## Корень Композиции

`code/clients/admin` - единственный host приложения.

- `src/main.tsx` подключает `@sellgar/kit/icons.css`, шрифт, тему и глобальные стили.
- `src/bootstrap.tsx` создает `AdminApplication` с `createWebRouterBridge`, вызывает `compose()`, рендерит view и запускает `initialize()`.
- `src/application/admin.application.tsx` задает components, application shell, initializers и features.
- `src/application/routes` владеет route graph, policies и nested routers.
- `src/application/bindings/admin.bindings.ts` регистрирует host-level dependencies: auth/session, repositories, API clients и application services.

Host не должен становиться местом для feature UI или feature business logic. Он только связывает packages.

## Runtime

Приложение использует `@sellgar/app`, а route contracts принадлежат `@library/route-tokens`.

- `Application` собирает runtime.
- `Route` и `Router` задают route tree.
- `@Module` описывает route-level страницу.
- `code/frames/*` описывают nested workflows, но используют единую runtime-декларацию
  `@Module`; route graph задаёт address, lazy load и shell.
- `@UseBindings` подключает DI bindings к application, page, frame или widget.
- Policies на route выполняют auth-gating.

## Маршруты

Публичная ветка:

- `/sign-in` -> `@module/sign-in`, доступен только для anonymous session.

Приватная ветка под `NavigateLayout`:

- `/` -> `@module/dashboard`;
- `/shops` -> `@module/shops`;
- `/products` -> `@module/products`;
- `/products/create` -> `@module/product-modify`;
- `/products/:uuid` -> `@module/product-modify`;
- `/store` -> `@module/store` и nested routes `@frame/store-review`/`@frame/store-modify` (в `code/frames/store/`) и `@frame/store-inventory`;
- `/brands`, `/categories`, `/units`, `/properties` -> list pages и nested create/edit frame routes.

Все nested frame routes отображаются одним application-level `Drawer` shell. Отдельного Modal shell для frames нет.

## Границы пакетов

- `code/modules/*` владеют route-level экранами и списками.
- `code/frames/*` владеют nested drawer формами и их loader/mutation процессом.
- `code/widgets/*` владеют маленькими reusable blocks, которые встраиваются в layout/page/frame.
- `code/layouts/*` владеют общим каркасом экрана.
- `code/providers/*` — отдельный слой runtime providers. Каждый provider — самостоятельный
  пакет `@provider/*`; страницы подключают нужный пакет через `providers: [...]`.
- `code/library/domain` владеет domain entities, repositories, API clients и HTTP helper.
- `code/library/design` - shared UI wrappers только без domain imports.
- `code/library/sellgar.app.ui` - локальный runtime package `@sellgar/app`.
- `code/library/route-tokens` - route token contracts.
- `code/utils/*` - чистые утилиты.

## Поток Данных

1. Route или nested frame подключает controller через bindings.
2. Controller loader получает данные и возвращает их runtime.
3. View читает данные через `useLoaderData(ControllerInterface)`.
4. Forms получают начальные значения из loader data на этапе создания формы.
5. Mutations вызываются из requests/hooks через `useController`.
6. После успешной mutation controller выполняет `close`, token navigation или revalidate по локальному contract.

Параметры маршрута типизируются token-классом и приходят в `args.params`. Строковые URL, `useFrame` и hash constants не являются частью активного runtime contract.
