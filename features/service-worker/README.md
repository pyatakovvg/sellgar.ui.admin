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
Существующий `VitePWA` в приложении создаёт virtual module и `sw.js`; его
конфигурация не входит в пакет фичи. Пресета для сборщика нет.

В Admin `devOptions.enabled: true`: регистрация работает и при обычном запуске
`yarn dev:admin_ui`, без отдельного флага среды. После успешной регистрации
фича пишет `SW: Registered` с URL worker и его scope в консоль браузера.

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
yarn build:admin_ui
```

Тесты проверяют регистрацию, polling, напоминание, повторные действия, activation,
timeout, замену worker, reload verification и завершение приложения.
Исторический аудит прежней реализации находится в `docs/service-worker.audit.md`.
