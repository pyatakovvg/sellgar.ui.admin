# AGENTS

## Назначение

Краткий контекст проекта для агентской работы в `sellgar.ui.admin`.

## Кратко

- Монорепа Yarn workspaces, основной клиент: `clients/admin` (Vite + React 19).
- Runtime приложения: `@tiyn/app`; DI bindings лежат рядом с application/pages/frames/widgets.
- UI kit: `@sellgar/kit`; иконки брать из `@sellgar/kit/icons`, не из font-class API.
- Домен и HTTP: `@library/domain`.
- Вся документация пишется на русском языке; paths, package names, команды и API identifiers оставлять как code literals.

## Входные точки

- `clients/admin/src/main.tsx` - глобальные стили и bootstrap.
- `clients/admin/src/bootstrap.tsx` - создание `AdminApplication`, React root, service worker.
- `clients/admin/src/application/admin.application.tsx` - layouts, policies, routes, frames.
- `clients/admin/src/application/bindings/admin.bindings.ts` - host-level bindings.
- `clients/admin/src/sw/service-worker.tsx` - UI обновления service worker.
- `clients/admin/src/styles/index.css` - глобальные стили.

## Роутинг

- Route tree описан в `AdminApplication`.
- Публичный route: `/sign-in`.
- Приватные routes под `NavigateLayout`: `/`, `/shops`, `/products`, `/store`, `/brands`, `/categories`, `/units`, `/properties`.
- Hash frames подключаются в route config через `frames: [...]`.
- Drawer/modal формы для списковых страниц должны жить во `frames/*`, а не во `widgets/*`.

## Пакеты

- `clients/admin` - host и composition root. Не складывать сюда feature logic.
- `layouts/*` - layout-пакеты.
- `pages/*` - route-level feature pages.
- `frames/*` - цельные drawer/modal workflows с собственными bindings/controller/view.
- `widgets/*` - встраиваемые reusable widgets.
- `library/*` - общие слои. `library/design` не должен зависеть от domain/pages/widgets.
- `utils/*` - чистые утилиты.

## Структура feature-пакета

- `src/index.ts` - public export.
- `src/module.tsx` или `src/*frame.tsx` - декларация module/frame.
- `src/classes/*` - controller/interface/bindings.
- `src/view/*` - UI слой.
- `src/requests/*` и `src/hooks/*` - feature-specific запросы и хуки.

## Runtime правила

- Pages используют `@Module` и `@UseBindings`.
- Frames используют `@Frame`, `HashFrameSource`, `FrameDefinition`, `@UseBindings`.
- Для hash-frame loader id приходит через `FrameControllerLoaderArgs<T>['props']`; не читать его из route params без проверки.
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
