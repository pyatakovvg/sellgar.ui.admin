# Service Worker feature

`@feature/service-worker` владеет регистрацией, проверкой обновлений, активацией
Service Worker и состоянием обновления. Приложение предоставляет компонент уведомления:

```tsx
import { ServiceWorkerFeature, ServiceWorkerPresentation } from '@feature/service-worker';
import { ServiceWorkerNotificationView } from './presentations/service-worker';

app.features([
  ServiceWorkerFeature.configure({
    presentation: ServiceWorkerPresentation.define((registry) => {
      registry.notification(ServiceWorkerNotificationView);
    }),
  }),
]);
```

Приложение регистрирует компонент уведомления через `ServiceWorkerPresentation.define`.
Слой `notification` задан внутри фичи. Внутренний `ServiceWorkerLayer` получает
контроллер и передаёт выбранному компоненту состояние и действия через
`ServiceWorkerNotificationProps`. Компонент уведомления не обращается к DI.
`ServiceWorkerNotificationView` принадлежит приложению и использует публичный
контракт props из `@feature/service-worker`. Каждый вызов `configure` создаёт
отдельную декларацию фичи с собственным lifecycle и application-scoped bindings.

Фича импортирует `registerSW` из `virtual:pwa-register` самостоятельно. Адаптер
регистрации, отдельный initializer и React-компонент в bootstrap не нужны.
Пресет `@feature/service-worker/vite` создаёт virtual module и `sw.js`.
Runtime и сборщик используют отдельные входы одного пакета; вход `/vite`
не импортирует React, DI и presentation фичи.

## Подключение Vite

```ts
import { defineConfig } from 'vite';
import { serviceWorker } from '@feature/service-worker/vite';

export default defineConfig({
  plugins: [
    serviceWorker({
      manifest: {
        id: '/sellgar-admin',
        name: 'Sellgar Admin',
        short_name: 'Sellgar',
        lang: 'ru',
      },
    }),
  ],
});
```

Пресет владеет `generateSW`, регистрацией через virtual module (`injectRegister: false`),
`prompt`, `skipWaiting: false`, `clientsClaim: false`, dev-регистрацией и очисткой
старого кеша. `base`, `root`, `publicDir` и каталог сборки берутся из Vite.
Регистрацию и активацию worker по-прежнему выполняет runtime фичи.

Приложение передаёт `manifest`, опциональные `includeAssets`, дополнительные
`runtimeCaching` и `buildId`. Без `manifest` генерируется только Service Worker.
Иконки manifest берутся из `publicDir` приложения. Генератор иконок и исходные
изображения остаются в приложении.

Стандартные правила кешируют изображения на сутки и шрифты на год, максимум
по 10 записей. Правила приложения проверяются раньше стандартных правил.
Максимальный размер файла precache — 10 MiB; `config.js` исключён из precache.

Пресет определяет `import.meta.env.VITE_APP_BUILD_ID`, который использует
`ReloadService`: сначала явный `buildId`, затем `VITE_APP_BUILD_ID` из среды Vite
с учётом `mode` и `envDir`, затем новый UUID для каждой сборки. Для dev без
заданного значения используется `development`. Если идентификатор передаёт CI,
он должен меняться между релизами.

В Admin `devOptions.enabled: true`: регистрация работает и при обычном запуске
`yarn dev:admin_ui`, без отдельного флага среды. После успешной регистрации
фича пишет `SW: Registered` с URL worker и его scope в консоль браузера.
Runtime-кеширование в dev отключено через `disableRuntimeConfig`: worker не
перехватывает исходные модули Vite и не вмешивается в HMR. В сборке стандартные
правила проверяют назначение запроса (`image`/`font`) и расширение pathname:
файлы `.icon.tsx` и SVG-модули не считаются изображениями.

Notification layer приложения и внешняя SW view Admin используют `z-index: 2147483647`, чтобы уведомление обновления
находилось поверх остальных окон и уведомлений приложения.

## Структура

- `service-worker.feature.tsx` — configure factory и lifecycle.
- `service-worker-feature.options.ts` — контракт настройки presentation.
- `presentation` — декларация презентера, registry, контракт props и внутренний runtime layer.
- `classes/classes.bindings.ts` — application-scoped DI и параметры среды Vite.
- `classes/service/update` — регистрация, проверки, напоминание и управление ресурсами.
- `classes/service/activation` — активация конкретного worker, ожидание и отмена.
- `classes/service/reload` — reload marker и проверка идентификатора сборки.
- `classes/store/update` — наблюдаемый статус без таймеров и побочных эффектов.
- `classes/controller/update` — пользовательские действия notification view.
- `vite/index.ts` — отдельный публичный фасад для сборщика.
- `vite/service-worker.ts` — композиция build plugin и `VitePWA` с правилами фичи.
- `vite/service-worker-build.plugin.ts` — передача идентификатора сборки в runtime.
- `vite/runtime-caching.ts` — стандартные правила кеширования.

Внешнее представление Admin находится в
`clients/admin/src/application/presentations/service-worker/notification`;
оно использует `Notification` и `Button` из `@sellgar/kit`.

## Поведение

Регистрация запускается один раз при `initialize`, независимо от React StrictMode.
Она не задерживает готовность приложения ожиданием Service Worker. Ошибки
регистрации и фоновых проверок журналируются и не блокируют приложение.

Проверка обновления выполняется раз в час, при возвращении видимости и сети
с тем же ограничением по времени. Одновременные проверки не дублируются.
Напоминание появляется через 15 минут, если worker ещё ожидает активации.

Обновление отправляет `SKIP_WAITING` конкретному worker и ждёт активации до 60
секунд. Если версия уже контролирует вкладку, перезагрузка не выполняется.
Reload marker сохраняет прежний `VITE_APP_BUILD_ID`; при `import.meta.env.PROD`
успех требует смены идентификатора сборки. В dev достаточно подтверждённой
активации. Имя существующего sessionStorage key сохранено.

Завершение приложения отменяет ожидание активации, удаляет собственные listeners
и таймеры. Поздние callbacks `registerSW` игнорируются. API `registerSW` не
предоставляет отписку от внутренних listeners Workbox; браузерная регистрация
SW сохраняется независимо от lifecycle приложения.

## Проверки

```bash
./node_modules/.bin/vitest run features/service-worker
./node_modules/.bin/tsc --noEmit -p features/service-worker/tsconfig.json
./node_modules/.bin/tsc --noEmit -p features/service-worker/tsconfig.vite.json
yarn build:admin_ui
```

Тесты проверяют регистрацию, polling, напоминание, повторные действия, activation,
timeout, замену worker, reload verification и завершение приложения.
Интеграционные тесты `/vite` выполняют реальные сборки: проверяют генерацию worker,
manifest и virtual registration, передачу `base`, исключение `config.js`, порядок
правил кеша, смену build ID и env-конфигурацию.
Исторический аудит прежней реализации находится в `docs/service-worker.audit.md`.
