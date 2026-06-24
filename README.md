# Админка Sellgar

Админский интерфейс Sellgar. Репозиторий собран как Yarn workspaces, основной клиент находится в `clients/admin`.

## Стек

- React 19, Vite, TypeScript.
- Runtime приложения: `@tiyn/app`.
- DI: bindings из `@tiyn/app` и `inversify`.
- UI kit: `@sellgar/kit`, иконки из `@sellgar/kit/icons`.
- Доменный слой и HTTP: `@library/domain`.

## Входные точки

- `clients/admin/src/main.tsx` подключает стили `@sellgar/kit` и глобальные стили.
- `clients/admin/src/bootstrap.tsx` создает `AdminApplication`, рендерит React root и запускает initializer.
- `clients/admin/src/application/admin.application.tsx` описывает layouts, initializers, policies, routes и frames.
- `clients/admin/src/application/bindings/admin.bindings.ts` регистрирует application/domain зависимости.
- `clients/admin/src/sw/service-worker.tsx` показывает UI обновления service worker.

## Рабочие области

- `clients/admin` - host-приложение и composition root.
- `layouts/*` - layout-пакеты приложения.
- `pages/*` - route-level страницы.
- `frames/*` - drawer/modal формы, открываемые через `useFrame`.
- `widgets/*` - переиспользуемые встраиваемые UI-блоки.
- `library/*` - общие библиотеки runtime/design/domain/message/push.
- `utils/*` - общие утилиты без UI.

## Основные маршруты

- `/sign-in` - публичный вход.
- `/` - dashboard.
- `/shops` - магазины.
- `/products` - список товаров, `/products/create` и `/products/:uuid` - форма товара.
- `/store` - складские позиции, frame `store`.
- `/brands` - бренды, frame `brand`.
- `/categories` - категории, frame `category`.
- `/units` - единицы измерения, frame `unit`.
- `/properties` - характеристики и группы характеристик, frames `property` и `property-group`.

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
