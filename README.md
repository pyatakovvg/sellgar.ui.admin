# Админка Sellgar

Админский интерфейс Sellgar. Репозиторий собран как Yarn workspaces, основной клиент находится в `clients/admin`.

## Стек

- React 19, Vite, TypeScript.
- Runtime приложения: `@sellgar/app`.
- Route tokens: отдельный пакет `@library/route-tokens`.
- DI: bindings из `@sellgar/app` и `inversify`.
- UI kit: `@sellgar/kit`, иконки из `@sellgar/kit/icons`.
- Доменный слой и HTTP: `@library/domain`.

## Входные точки

- `clients/admin/src/main.tsx` подключает стили `@sellgar/kit` и глобальные стили.
- `clients/admin/src/bootstrap.tsx` создает `AdminApplication`, рендерит React root и запускает initializer.
- `clients/admin/src/application/admin.application.tsx` описывает application-wide components, shell, initializers и features; route graph находится в `src/application/routes`.
- `clients/admin/src/application/bindings/admin.bindings.ts` регистрирует application/domain зависимости.
- `clients/admin/src/sw/service-worker.tsx` показывает UI обновления service worker.

## Рабочие области

- `clients/admin` - host-приложение и composition root.
- `layouts/*` - layout-пакеты приложения.
- `pages/*` - route-level страницы.
- `frames/*` - вложенные route workflows, отображаемые через единый application-level `Drawer`.
- `widgets/*` - переиспользуемые встраиваемые UI-блоки.
- `library/*` - общие библиотеки runtime/design/domain/message/push.
- `utils/*` - общие утилиты без UI.

## Основные маршруты

- `/sign-in` - публичный вход.
- `/` - dashboard.
- `/shops` - магазины.
- `/products` - список товаров, `/products/create` и `/products/:uuid` - форма товара.
- `/store` - складские позиции и вложенные drawer routes.
- `/brands`, `/categories`, `/units`, `/properties` - списки и вложенные create/edit drawer routes.

## Скрипты

```bash
yarn dev:admin_ui
yarn build:admin_ui
yarn test
```

## Документация

- `docs/architecture.md` - карта приложения и границы пакетов.
- `docs/development` - правила разработки и runtime-контракты.
- `docs/design` - процесс проектирования изменений.
- `docs/agent` - инструкции для агентской работы.
