# AGENTS

## Назначение

Краткий контекст проекта для агентской работы в `sellgar.ui.admin`.

## Кратко

- Монорепа Yarn workspaces, основной клиент: `clients/admin` (Vite + React 19).
- Runtime приложения: `@sellgar/app-v2`; DI bindings лежат рядом с application/pages/frames/widgets.
- Route tokens принадлежат отдельному пакету `@library/route-tokens`.
- UI kit: `@sellgar/kit`; иконки брать из `@sellgar/kit/icons`, не из font-class API.
- Домен и HTTP: `@library/domain`.
- Вся документация пишется на русском языке; paths, package names, команды и API identifiers оставлять как code literals.

## Входные точки

- `clients/admin/src/main.tsx` - глобальные стили и bootstrap.
- `clients/admin/src/bootstrap.tsx` - создание `AdminApplication`, React root, service worker.
- `clients/admin/src/application/admin.application.tsx` - application-wide components, shell, initializers и features.
- `clients/admin/src/application/routes` - route graph и nested routing.
- `clients/admin/src/application/bindings/admin.bindings.ts` - host-level bindings.
- `clients/admin/src/sw/service-worker.tsx` - UI обновления service worker.
- `clients/admin/src/styles/index.css` - глобальные стили.

## Роутинг

- Route graph создаётся в `clients/admin/src/application/routes` и подключается в `AdminApplication`.
- Публичный route: `/sign-in`.
- Приватные routes под `NavigateLayout`: `/`, `/shops`, `/products`, `/store`, `/brands`, `/categories`, `/units`, `/properties`.
- Drawer workflows подключаются как nested `Router` через `Route.routing` и открываются только по route tokens.
- Для feature frames используется единый application-level `Drawer` shell. Отдельный Modal shell не создавать.

## Пакеты

- `clients/admin` - host и composition root. Не складывать сюда feature logic.
- `layouts/*` - layout-пакеты.
- `pages/*` - route-level feature pages.
- `frames/*` - цельные nested drawer workflows с собственными bindings/controller/view.
- `widgets/*` - встраиваемые reusable widgets.
- `library/*` - общие слои. `library/design` не должен зависеть от domain/pages/widgets.
- `library/provider` - reusable singleton providers и concrete realtime Hub adapters.
- `library/socket-io` - demand-driven Socket.IO connections без domain-specific контрактов.
- `library/sellgar.kit.ui` - nested submodule UI kit; его commit и gitlink admin UI фиксируются раздельно.
- `library/sellgar.orm.ui` - nested submodule ORM UI; его commit и gitlink admin UI фиксируются раздельно.
- `library/tiyn-app-v2` - активный runtime `@sellgar/app-v2`.
- `library/route-tokens` - стабильные route token contracts без зависимости от React/runtime host.
- `library/sellgar.app.ui` - неиспользуемый V1 runtime; новый application code не должен от него зависеть.
- `utils/*` - чистые утилиты.

## Структура feature-пакета

- `src/index.ts` - public export.
- `src/module.tsx` или `src/*frame.tsx` - декларация module/frame.
- `src/classes/*` - controller/interface/bindings.
- `src/view/*` - UI слой.
- `src/requests/*` и `src/hooks/*` - feature-specific запросы и хуки.

## Runtime правила

- Pages используют `@Module` и `@UseBindings`.
- Frames остаются feature-пакетами `frames/*`, но runtime-декларация у них единая с pages: `@Module` и
  `@UseBindings`; address и shell задаются route graph/application routing.
- Route identifiers приходят в `ControllerArgs<WithParams<...>>['params']`; тип выводить из token через `RouteParams<typeof Token>`.
- Navigation выполнять через `useNavigate()`/`NavigateServiceInterface` и route token, без строковых URL.
- Табличное открытие drawer делать через click row, если действие является основным для строки.
- Для таблиц использовать актуальный компонент `Table` из `@sellgar/kit`.

## Скрипты

- Запуск админки: `yarn dev:admin_ui`.
- Сборка админки: `yarn build:admin_ui`.
- Тесты: `yarn test`.

## Документация

- Общая карта: `README.md`, `docs/architecture.md`.
- Правила разработки: `docs/development`.
- Агентские инструкции: `docs/agent`.
