## Обзор проекта

### Кратко
- Монорепа на Yarn workspaces, основной клиент: `clients/admin` (Vite + React 19).
- Архитектура: собственный слой `@library/app` (Router/Module/Application), DI через `inversify`, доменные сущности в `@library/domain`.
- UI‑обвязки: `@library/design`, системные уведомления/пуши: `@library/message`, `@library/push`.

### Структура репозитория
- `clients/admin` — основное приложение админки (Vite + React).
- `layouts/*` — лейауты (`app`, `base`, `navigate`).
- `library/*` — общие библиотеки:
  - `app` — Application/Router/Module и инфраструктура.
  - `domain` — сущности, helpers (config/http-client), декораторы.
  - `design` — UI‑обвязки (`Page`, `Form`, `Logotype`).
  - `message`, `push` — сообщения и пуш‑уведомления.
- `pages/*` — страницы (каждая как модуль с view/controller/store).
- `widgets/*` — виджеты (modify/logout и т.п.).
- `utils/*` — утилиты (format/generate).

### Входные точки
- `clients/admin/src/main.tsx` → `clients/admin/src/bootstrap.tsx`
- DI контейнер: `clients/admin/src/container.module.ts`
- Service Worker / обновления: `clients/admin/src/sw/service-worker.tsx`

### Роутинг и модули
- Роутинг задается в `clients/admin/src/bootstrap.tsx`.
- Страницы подключаются как модули `@library/app` из `pages/*/src/module.tsx`.
- Приватные маршруты через `PrivateRoutes`, публичные — через `PublicRoutes`.

### Потоки данных и DI (подробно)
- DI контейнер приложения инициализируется в `clients/admin/src/container.module.ts` и подключается в `clients/admin/src/bootstrap.tsx`.
- Контейнеры модулей страниц регистрируются через декоратор `@Module` в `pages/*/src/module.tsx`.
- В `@library/app`:
  - `Application` создает корневой контекст и контейнер.
  - `Router` строит маршруты и подключает `PrivateRoutes`/`PublicRoutes`.
  - `PrivateRoutes` перед переходом подгружает профиль (если требуется) и проверяет `authStore.isAuth`.
- Доменные сервисы и gateway лежат в `@library/domain`, запросы идут через `HttpClient` (axios + интерцепторы ошибок).

### Авторизация и загрузка профиля
- Приватные маршруты обслуживаются `PrivateRoutes` в `@library/app`.
- При заходе на приватные страницы выполняется `loader`, который получает `ApplicationControllerInterface` из DI.
- Логика:
  - если `authStore.isAuth === false`, то по умолчанию вызывается `loadProfile()`;
  - если `preloadProfile` отключен, то `authStore.setAuth(true)` устанавливает сессию без загрузки профиля.
- При ошибке авторизации (401) пользователь перенаправляется на `/sign-in`.

### Запросы и обработка ошибок
- `library/domain/src/helpers/http-client/http-client.ts` — единая обертка над axios.
- Ошибки приводятся к доменным исключениям (`UnauthorizedException`, `ForbiddenException`, и т.д.).
- Обработчик ошибок маршрута: `clients/admin/src/components/exception/exception.tsx`.
- 401 → редирект на `/sign-in`, массив ошибок → экран валидации.

### Навигация и хлебные крошки
- Меню слева: `layouts/navigate/src/navigate/navigate.tsx`.
- Хлебные крошки: `library/app/src/components/breadcrumbs/*`.
- Подписи крошек берутся из `breadcrumb` в настройках маршрутов.

### Сервис‑воркер и обновления
- Регистрация и обновление: `clients/admin/src/sw/service-worker.tsx`.
- Контейнер уведомлений обновления: `#sw` в `clients/admin/src/styles/index.css`.

### Страницы (примеры)
- `pages/products` — список товаров.
- `pages/product-modify` — создание/редактирование товара.
- `pages/store` / `pages/store-modify` — склад.
- `pages/brands`, `pages/categories`, `pages/units`, `pages/properties`.
- `pages/sign-in` — авторизация.

### Виджеты (примеры)
- `widgets/brand-modify`, `widgets/category-modify`, `widgets/unit-modify`, `widgets/property-modify`.
- `widgets/logout` — выход пользователя.

### Скрипты
- Запуск админки: `yarn dev:admin_ui`
- Сборка админки: `yarn build:admin_ui`
