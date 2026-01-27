## AGENTS

### Назначение
Краткий контекст проекта для быстрой ориентации.

### Кратко
- Монорепа Yarn workspaces, основной клиент: `clients/admin` (Vite + React 19).
- Каркас: `@library/app` (Router/Module/Application), DI: `inversify`, домен: `@library/domain`.
- UI‑обвязки: `@library/design`, уведомления: `@library/message`, пуши: `@library/push`.

### Входные точки
- `clients/admin/src/main.tsx` → `clients/admin/src/bootstrap.tsx`.
- DI контейнер: `clients/admin/src/container.module.ts`.
- Service Worker: `clients/admin/src/sw/service-worker.tsx`.
- Глобальные стили: `clients/admin/src/styles/index.css` (контейнер `#sw`).

### Роутинг и страницы
- Маршруты: `clients/admin/src/bootstrap.tsx`.
- Страницы как модули: `pages/*/src/module.tsx`.
- Приватные/публичные: `PrivateRoutes` / `PublicRoutes` в `@library/app`.
- Хлебные крошки: `library/app/src/components/breadcrumbs/*` (через `breadcrumb` в маршрутах).

### Авторизация
- `PrivateRoutes` запускает `loader` и грузит профиль через `ApplicationControllerInterface`.
- 401 ведет на `/sign-in` через `clients/admin/src/components/exception/exception.tsx`.

### Лейауты
- `layouts/app` — обертка и провайдер сообщений.
- `layouts/base` — базовый каркас.
- `layouts/navigate` — меню и крошки.

### Запросы и ошибки
- HTTP слой: `library/domain/src/helpers/http-client/http-client.ts`.
- Ошибки роутинга: `clients/admin/src/components/exception/exception.tsx`.

### Скрипты
- Запуск админки: `yarn dev:admin_ui`
- Сборка админки: `yarn build:admin_ui`

### UI
- Большинство страниц используют `@library/design` (`Page`, `Form`).

### Основные каталоги
- `clients/admin` — приложение админки.
- `pages/*` — страницы (module/view/controller/store/requests).
- `widgets/*` — виджеты (modify/logout и т.п.).
- `library/*` — общие библиотеки.
- `utils/*` — утилиты (format/generate).

### Карта зависимостей
- `clients/admin` → `layouts/*`, `pages/*`, `library/*`, `widgets/*`.
- `pages/*` → `@library/app`, `@library/design`, `@library/domain`, `@sellgar/kit`.
- `widgets/*` → `@library/app`, `@library/design`, `@library/domain`.
- `layouts/*` → `@library/design`, `@library/message`, `@widget/logout`.
- `library/*` — базовый слой, без зависимостей на pages/widgets.

### Структура модуля страницы
- `src/module.tsx` — регистрация модуля (`@Module`) и DI.
- `src/classes/*` — контроллеры/сторы/DI‑бинды.
- `src/view/*` — UI слой (header/content/filters/modify).
- `src/requests/*` — сетевые запросы (если есть).
- `src/hooks/*` — хуки данных/процессов (если есть).

### Точки расширения
- Страница: `pages/<name>` + маршрут в `clients/admin/src/bootstrap.tsx`.
- Виджет: `widgets/<name>` + подключение в нужный view/layout.
- Доменная модель: `library/domain/src/classes/<entity>` + экспорт в `library/domain/src/index.ts`.
- DI бинды: соответствующий `container.module.ts` в приложении/модуле.
