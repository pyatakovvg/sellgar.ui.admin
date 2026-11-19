# AGENTS

## Назначение

Краткий контекст проекта для агентской работы в `sellgar.ui.admin`.

## Организация репозитория

- Исходники и корень Yarn находятся в `code/`; команды Yarn выполнять из него.
- Dockerfile и `.dockerignore` находятся в корне; Docker build context — корень.
- Nginx: `code/clients/admin/nginx/nginx.conf` и `conf.d/default.conf`.
- CI: `.github/workflows/ci.yml`.
- Helm values: `helm/values.app.yaml`, `helm/dev/values.yaml`, `helm/prod/values.yaml`.
  Общий chart находится в `sellgar.infrastructure/charts/application`.
  Не создавать собственные Kubernetes templates или каталог `deploy/` в админке.
  ConfigMap с `config.js` описывается в `configmaps` values соответствующей среды.
- Документация и Git-конфигурация остаются в корне.

## Кратко

- Монорепа Yarn workspaces, основной клиент: `code/clients/admin` (Vite + React 19).
- Runtime приложения: `@sellgar/app`; DI bindings лежат рядом с application/modules/frames/widgets.
- Route tokens принадлежат отдельному пакету `@library/route-tokens`.
- UI kit: `@sellgar/kit`; иконки брать из `@sellgar/kit/icons`, не из font-class API.
- Домен и HTTP: `@library/domain`.
- Вся документация пишется на русском языке; paths, package names, команды и API identifiers оставлять как code literals.

## Входные точки

- `code/clients/admin/src/main.tsx` - глобальные стили и bootstrap.
- `code/clients/admin/src/bootstrap.tsx` - создание `AdminApplication` и React root.
- `code/clients/admin/src/application/admin.application.tsx` - application-wide components, shell, initializers и features.
- `code/clients/admin/src/application/routes` - route graph и nested routing.
- `code/clients/admin/src/application/bindings/admin.bindings.ts` - host-level bindings.
- `code/features/service-worker` - application feature регистрации и обновления service worker.
- `code/clients/admin/src/styles/index.css` - глобальные стили.

## Роутинг

- Route graph создаётся в `code/clients/admin/src/application/routes` и подключается в `AdminApplication`.
- Публичный route: `/sign-in`.
- Приватные routes под `NavigateLayout`: `/`, `/shops`, `/products`, `/store`, `/carts`, `/brands`, `/categories`, `/units`, `/properties`.
- Drawer workflows подключаются как nested `Router` через `Route.routing` и открываются только по route tokens.
- Для feature frames используется единый application-level `Drawer` shell. Отдельный Modal shell не создавать.

## Пакеты

- `code/clients/admin` - host и composition root. Не складывать сюда feature logic.
- `code/features/*` - application features с именами `@feature/*`, подключаемые через `app.features`.
- `code/layouts/*` - layout-пакеты.
- `code/modules/*` - route-level feature modules.
- `code/frames/*` - цельные nested drawer workflows с собственными bindings/controller/view.
- `code/widgets/*` - встраиваемые reusable widgets.
- `code/library/*` - общие слои. `code/library/design` не должен зависеть от domain/modules/widgets.
- `code/providers/*` - самостоятельные runtime provider packages с именами `@provider/*`, собственными bindings и concrete realtime Hub adapters.
- `code/library/socket-io` - demand-driven Socket.IO connections без domain-specific контрактов.
- `code/library/sellgar.kit.ui` - nested submodule UI kit; его commit и gitlink admin UI фиксируются раздельно.
- `code/library/sellgar.orm.ui` - nested submodule ORM UI; его commit и gitlink admin UI фиксируются раздельно.
- `code/library/sellgar.app.ui` - единственный активный runtime `@sellgar/app`; nested submodule и источник framework-контракта.
- `code/library/route-tokens` - стабильные route token contracts без зависимости от React/runtime host.
- `code/utils/*` - чистые утилиты.

## Структура feature-пакета

- `src/index.ts` - public export.
- `src/module.tsx` или `src/*frame.tsx` - декларация module/frame.
- `src/classes/*` - controller/interface/bindings.
- `src/view/*` - UI слой.
- `src/requests/*` и `src/hooks/*` - feature-specific запросы и хуки.

## Runtime правила

- Pages используют `@Module` и `@UseBindings`.
- Frames остаются feature-пакетами `code/frames/*`, но runtime-декларация у них единая с modules: `@Module` и
  `@UseBindings`; address и shell задаются route graph/application routing.
- Route identifiers приходят в `ControllerArgs<WithParams<...>>['params']`; тип выводить из token через `RouteParams<typeof Token>`.
- Navigation выполнять через `useNavigate()`/`NavigateServiceInterface` и route token, без строковых URL.
- Табличное открытие drawer делать через click row, если действие является основным для строки.
- Для таблиц использовать новый компонент `Table` из `@sellgar/kit/table`.
- Статические декларации `Column` писать без `key`: идентичность задаётся структурой декларации. `key` нужен для динамических коллекций колонок с изменяемым составом или порядком.

## Скрипты

- Запуск админки: `yarn dev:admin_ui`.
- Сборка админки: `yarn build:admin_ui`.
- Тесты: `yarn test`.

## Документация

- Общая карта: `README.md`, `docs/architecture.md`.
- Правила разработки: `docs/development`.
- Агентские инструкции: `docs/agent`.

## Размеры интерфейса

- Во всех собственных стилях размеры, отступы, границы и смещения задаются через существующие токены кита `var(--numbers-X)`. Литералы px разрешены только в условиях `@media`, где CSS custom properties не поддерживаются.
- Типографика задаётся компонентом Typography из кита; не перекрывать её ручным font-size в CSS. Определения токенов внутри самого кита не заменять рекурсивными ссылками.

## Формат стилей

- Для собственных компонентов использовать CSS Modules (`*.module.css`) и нативные возможности CSS. SCSS допустим только при необходимой Sass-логике; Sass-переменные не использовать. Дизайн-значения берутся из CSS custom properties кита.
