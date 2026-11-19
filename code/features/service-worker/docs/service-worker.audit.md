# Аудит механизма обновления Service Worker

> Исторический аудит реализации до переноса в `@feature/service-worker`.
> Текущая структура и подключение описаны в `../README.md`.

- Дата проверки: 2026-08-03
- Актуализировано: 2026-09-02 после повторного воспроизведения update lifecycle в браузере
- Объект проверки: `service-worker.tsx`, generated `sw.js`, Vite PWA/Workbox, NGINX и Helm-конфигурация management panel
- Workflow profile: `L0 documentation` для исходного аудита; `L2 behavior change` для исправления update lifecycle
- Статус документа: historical
- Статус результата: клиентский lifecycle, build verification, precache policy и NGINX policy реализованы; deployment verification остаётся обязательным после выкладки

## Актуализация 2026-09-02

Повторная браузерная проверка подтвердила false-negative: уведомление могло
оставаться открытым после перехода worker из `waiting` в `activating`, а обработчик
кнопки считал отсутствие `registration.waiting` ошибкой сети. На dev-сервере также
подтвердилась двойная регистрация из render-time React hook под `StrictMode`.

Реализована следующая модель:

- регистрация запускается один раз из идемпотентного React effect;
- команда `SKIP_WAITING` отправляется конкретному захваченному worker;
- переходы `installing`, `waiting`, `activating`, `activated` и replacement после
  `redundant` согласовываются одной функцией lifecycle;
- отсутствие `waiting` не считается ошибкой, если новая версия уже активируется
  или контролирует вкладку;
- перед reload сохраняется build ID, а новая загрузка подтверждает, что build ID
  действительно изменился;
- timeout и lifecycle errors больше не маскируются сообщением о проблеме сети;
- periodic update выполняется раз в час и не допускает параллельных `update()`;
- `config.js` исключён из precache;
- NGINX получил strict `404` для отсутствующих assets/workbox-файлов и отдельные
  cache policies для `sw.js`, `index.html`, `config.js` и manifest;
- generated `vite.config.js`, declarations и `tsbuildinfo` удалены из source tree,
  поэтому сборка использует единственный `vite.config.ts`.

После выкладки необходимо отдельно проверить заголовки и strict fallback на
фактическом ingress/NGINX, а также полный переход между двумя production build ID.

## Итог

Нестабильное обновление приложения связано не с одной ошибкой Service Worker, а с несколькими независимыми проблемами:

1. Изменяемый между окружениями `config.js` попадает в precache и может бессрочно отдаваться из Cache Storage в устаревшей версии.
2. NGINX возвращает `index.html` со статусом `200` вместо `404` для отсутствующих JS-файлов.
3. После удаления reload по таймеру страница перестала перезагружаться: при `clientsClaim: false` новый worker активируется, но не начинает контролировать уже открытую вкладку, поэтому событие `controlling` не наступает.
4. Проверка обновления каждые 20 секунд не очищается, не обрабатывает ошибки и конфликтует с временной эвристикой `workbox-window`.
5. Одновременно существуют `vite.config.ts` и generated `vite.config.js`, причём Vite по умолчанию выбирает JavaScript-файл первым.

Простая замена `skipWaiting: false` на `true` не устраняет эти причины и может усилить рассинхронизацию версий страницы и lazy-loaded chunks.

## Для чего используется Service Worker

Компонент `service-worker.tsx` выполняет клиентскую часть PWA-механизма:

- регистрирует сгенерированный `sw.js`;
- периодически вызывает `ServiceWorkerRegistration.update()`;
- получает сигнал, что новая версия установлена и находится в состоянии `waiting`;
- показывает уведомление пользователю;
- по подтверждению отправляет новому worker команду `SKIP_WAITING`;
- инициирует перезагрузку страницы.

Сам `sw.js` генерируется `vite-plugin-pwa` из `vite.config.ts`. Он:

- precache-ит `index.html`, JS, CSS, шрифты, изображения, manifest и `config.js`;
- отдаёт precached `index.html` для навигационных запросов;
- использует `CacheFirst` для изображений и шрифтов;
- не кеширует API-запросы.

Поэтому это не полноценное offline-приложение: без BFF оболочка может открыться, но рабочие данные management panel будут недоступны. Значение `offlineReady` сейчас только записывается в console.

## Подтверждённые критические проблемы исходной реализации

Раздел сохраняет доказательства исходного аудита. Текущий implementation status
для каждого пункта зафиксирован в актуализации от 2026-09-02 выше; production
считается исправленным только после deployment verification.

### 1. Runtime-конфигурация фиксируется в precache

`config.js` подключается в `index.html`:

```html
<script defer src="/config.js"></script>
```

В Kubernetes он монтируется как отдельный ConfigMap:

```yaml
- mountPath: /usr/share/nginx/html/config.js
  name: config-js
  subPath: config.js
```

При этом generated worker включает его в precache:

```text
"url": "config.js",
"revision": "342bd23ddca78f34c57eaaa4955600c4"
```

Это архитектурное противоречие:

- приложение собирается один раз;
- `config.js` может изменяться отдельно при настройке окружения;
- старый worker продолжает отдавать сохранённую копию из Cache Storage;
- `Cache-Control: no-store` не исправляет ситуацию, поскольку Service Worker Cache и HTTP cache — разные механизмы.

Проверка production подтвердила рассинхронизацию:

- deployed `sw.js` имеет `Last-Modified: Fri, 20 Feb 2026 10:42:15 GMT`;
- deployed `config.js` имеет `Last-Modified: Tue, 23 Jun 2026 09:21:26 GMT`;
- MD5 текущего production `config.js` не совпадает с revision, записанной в production `sw.js`.

Существующие клиенты, контролируемые старым worker, могут продолжать получать старые endpoint/config values.

#### Рекомендация

Минимальный вариант:

- исключить `config.js` из Workbox precache;
- отдавать его с `Cache-Control: no-store`;
- запретить SPA fallback для этого URL.

Целевой вариант:

- заменить глобальный исполняемый скрипт на `/runtime-config.json`;
- загружать его через `fetch(url, { cache: 'no-store' })`;
- валидировать схему конфигурации;
- запускать приложение только после успешной загрузки;
- явно исключить файл из маршрутов Service Worker.

### 2. Отсутствующие ассеты возвращают `index.html`

В NGINX используется общий fallback:

```nginx
location / {
    try_files $uri $uri/ /index.html =404;
}
```

Фактическая проверка dev и production показала:

```text
GET /terminals-management/assets/definitely-missing-service-worker-audit.js
HTTP 200
Content-Type: text/html
```

В результате:

- старый HTML может запросить уже удалённый hashed chunk;
- вместо ожидаемого `404` браузер получает HTML;
- загрузка падает с MIME/dynamic import error;
- при несовпадении версий pod-ов Workbox может принять ответ `200` и сохранить HTML под URL JavaScript-файла.

Для `/assets/` и `/workbox-*` должен использоваться строгий `try_files $uri =404`. SPA fallback допустим только для маршрутов приложения.

Официальная рекомендация: [Vite PWA — NGINX deployment](https://vite-pwa-org.netlify.app/deployment/nginx).

### 3. Перезагрузка выполняется до завершения активации

Предыдущий код:

```ts
const update = async () => {
  await updateServiceWorker(true);
  setTimeout(() => window.location.reload(), 500);
};
```

В используемой версии `vite-plugin-pwa` метод `updateServiceWorker()`:

1. дожидается регистрации;
2. отправляет `SKIP_WAITING`;
3. сразу завершает Promise.

Он не ждёт состояний `activating`, `activated` и события `controllerchange`/`controlling`.

Plugin подписан на `controlling` и умеет автоматически перезагружать страницу. Однако текущая конфигурация использует `clientsClaim: false`: после `skipWaiting()` новый worker становится активным, но не забирает уже открытую вкладку под своё управление. Поэтому простое удаление таймера оставляет вкладку без механизма reload. Сам таймер также ненадёжен: если 500 мс истекут раньше завершения активации, новый запрос страницы ещё может обслужить старый worker.

Правильная последовательность:

```text
waiting
  → пользователь подтверждает обновление
  → SKIP_WAITING
  → activating
  → activated
  → единственная перезагрузка страницы
  → активный worker контролирует новую загрузку
```

Минимальное исправление при сохранении `clientsClaim: false` — дождаться состояния `activated` у конкретного waiting worker и затем явно перезагрузить страницу. После навигации активный worker начнёт контролировать новую загрузку.

Клиентская реализация должна сразу показывать состояние обновления, ограничивать ожидание активации таймаутом, разрешать повтор после ошибки и защищать reload от повторного вызова. Вариант с reload по `controlling` требует отдельного осознанного перехода на `clientsClaim: true` и проверки поведения нескольких вкладок.

Официальный сценарий: [Workbox — handling service worker updates](https://developer.chrome.com/docs/workbox/handling-service-worker-updates).

## Другие существенные проблемы

### Проверка обновлений каждые 20 секунд

```ts
r &&
  setInterval(() => {
    console.log('SW: Checking for sw update');
    r.update();
  }, 20000);
```

Недостатки:

- отсутствует `clearInterval`;
- Promise от `r.update()` не ожидается;
- ошибки не обрабатываются;
- не предотвращаются параллельные проверки;
- scheduler находится внутри React-компонента, включённого в `React.StrictMode`;
- обновление в пределах первой минуты после регистрации может попасть в эвристику external worker в `workbox-window`.

Документация `vite-plugin-pwa` приводит периодическую проверку раз в один час и отдельно предупреждает о поведении в пределах первой минуты: [Vite PWA React — periodic updates](https://vite-pwa-org.netlify.app/frameworks/react#periodic-sw-updates).

Рекомендуемая политика:

- одна проверка после запуска;
- проверка при переходе вкладки в `visible`;
- проверка при событии `online`;
- периодическая проверка раз в 30–60 минут;
- только один выполняющийся `update()` одновременно;
- обязательные `catch`, logging и telemetry.

### Кнопка «Напомнить позже» не создаёт напоминание

Кнопка только сбрасывает React-state. Worker остаётся в `waiting`, но повторный показ уведомления в текущей сессии не планируется.

Варианты:

- переименовать кнопку в «Закрыть»;
- действительно сохранять `remindAt` и повторно показывать уведомление;
- повторно показывать его после возвращения вкладки в `visible`;
- учитывать наличие несохранённых изменений в формах.

### Отсутствует состояние процесса обновления

Сейчас нет:

- `isUpdating` и блокировки повторного клика;
- timeout активации;
- сообщения об ошибке;
- восстановления после неудачного `SKIP_WAITING`;
- защиты несохранённых форм;
- координации нескольких вкладок.

Для management panel режим `registerType: 'prompt'` выбран правильно: автоматическая перезагрузка может уничтожить данные, введённые в формы. Это отмечено в [документации Vite PWA](https://vite-pwa-org.netlify.app/guide/auto-update).

### Два источника Vite-конфигурации

В каталоге одновременно находятся и отслеживаются Git:

- `vite.config.ts`;
- `vite.config.js`;
- `vite.config.d.ts`;
- `tsconfig.node.tsbuildinfo`.

Vite ищет `vite.config.js` раньше `vite.config.ts`, поэтому фактическая сборка по умолчанию использует JavaScript-файл. На момент аудита TS и JS семантически совпадают, но изменение только TypeScript-конфигурации не повлияет на build.

Рекомендация:

- оставить единственный `vite.config.ts`;
- включить `noEmit` для `tsconfig.node.json`;
- удалить generated config-файлы из version control;
- либо временно передавать `vite --config vite.config.ts` явно.

### Runtime cache имеет слишком широкие правила

Текущие правила:

```ts
/.*\.(ico|png|svg|webp|webv)/i
/.*\.(ttf|woff|woff2|eot)/i
```

Недостатки:

- отсутствует проверка `url.origin` и scope приложения;
- используются общие для origin имена `static-images-cache` и `static-fonts-cache`;
- `CacheFirst` хранит стабильный URL картинки до суток, а шрифта — до года;
- разрешён status `0`, то есть opaque cross-origin response;
- `webv`, вероятно, является опечаткой вместо `webm`;
- regex не закреплён на конец pathname.

Рекомендуется:

- использовать app-specific prefix для cache names;
- ограничить matcher origin и `/terminals-management/`;
- для hashed assets использовать immutable HTTP caching;
- для изменяемых URL применять `StaleWhileRevalidate` или `NetworkFirst`;
- не кешировать opaque responses без явной необходимости.

### Неверный MIME для web manifest

На dev и production:

```text
Content-Type: application/octet-stream
```

Должно быть:

```text
Content-Type: application/manifest+json
```

## Целевая NGINX-конфигурация

Ingress удаляет prefix `/terminals-management`, поэтому внутренние пути NGINX начинаются с `/`.

```nginx
types {
    application/manifest+json webmanifest;
}

location = /sw.js {
    try_files $uri =404;
    add_header Cache-Control "no-store" always;
}

location = /index.html {
    try_files $uri =404;
    add_header Cache-Control "no-cache, must-revalidate" always;
}

location = /config.js {
    try_files $uri =404;
    add_header Cache-Control "no-store" always;
}

location = /manifest.webmanifest {
    try_files $uri =404;
    add_header Cache-Control "no-cache, must-revalidate" always;
}

location ^~ /assets/ {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
}

location ^~ /workbox- {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
}

location / {
    try_files $uri $uri/ /index.html;
    add_header Cache-Control "no-cache, must-revalidate" always;
}
```

При внедрении необходимо сохранить существующий CSP на server/location-уровне.

Фактическая проверка показала, что `sw.js` <!-- nav-check: allow-missing reason=generated deployed runtime asset -->, `index.html` и `config.js` <!-- nav-check: allow-missing reason=environment-mounted runtime asset --> на dev/prod уже имеют `Cache-Control: no-store`. Это правильная часть конфигурации; критическая проблема находится в SPA fallback и Service Worker precache.

## Предлагаемая модель обновления

Рекомендуемая клиентская машина состояний:

```text
idle
  → checking
  → up-to-date

checking
  → waiting-for-user
  → update-error

waiting-for-user
  → activating
  → deferred

activating
  → activated
  → activation-timeout

activated
  → reloading
```

Требования к реализации:

- отправлять `SKIP_WAITING` только worker в состоянии `waiting`;
- отключать кнопку после первого нажатия;
- при текущем `clientsClaim: false` перезагружать страницу только после `activated` ожидающего worker;
- использовать guard, гарантирующий единственную перезагрузку;
- показывать понятную ошибку после timeout;
- сохранять или блокировать обновление при dirty form;
- координировать вкладки через `BroadcastChannel`;
- логировать build ID текущей страницы и worker.

## Стратегия публикации

Даже с правильным Service Worker deployment может создавать version skew. Во время rollout одновременно могут обслуживаться разные версии приложения.

Рекомендуется:

- не удалять ассеты предыдущего релиза сразу;
- хранить hashed assets нескольких последних релизов;
- либо использовать atomic/blue-green публикацию;
- сначала публиковать новые immutable assets, затем `sw.js` и `index.html`;
- никогда не возвращать `index.html` для отсутствующего asset;
- добавить no-cache endpoint с build ID/version;
- предусмотреть безопасный rollback.

Vite рекомендует временно сохранять старые chunks и обрабатывать ошибки dynamic import: [Vite troubleshooting — version skew](https://vite.dev/guide/troubleshooting#failed-to-fetch-dynamically-imported-module).

## Аварийное восстановление

Следует предусмотреть контролируемый escape hatch:

- unregister только Service Worker scope management panel;
- удалить только cache names с prefix этого приложения;
- выполнить reload с network;
- не очищать все origin caches без разбора;
- не запускать recovery автоматически при любой сетевой ошибке.

Дополнительно можно обрабатывать `vite:preloadError`, но reload должен иметь `sessionStorage`-guard, чтобы не создать бесконечный цикл. Официальный механизм описан в [Vite — Load Error Handling](https://vite.dev/guide/build#load-error-handling).

## Наблюдаемость

Нужно собирать как минимум:

- build ID страницы;
- build ID active и waiting worker;
- `registration`, `updatefound`, `installed`, `waiting`;
- `activating`, `activated`, `controllerchange`;
- длительность проверки и активации;
- ошибки регистрации и `registration.update()`;
- возраст waiting worker;
- ошибки загрузки chunks и MIME mismatch;
- факт согласия или отсрочки обновления пользователем.

Это позволит отличать:

- worker не найден;
- новый worker не установился;
- worker установился, но ждёт вкладки;
- `SKIP_WAITING` не дошёл;
- activation завершилась, но reload не произошёл;
- страница загрузилась, но старый chunk удалён с сервера.

## Обязательные сценарии проверки

### Service Worker lifecycle

- первая установка;
- отсутствие обновления;
- обнаружение новой версии;
- «Обновить сейчас»;
- повторный клик по кнопке;
- «Напомнить позже»;
- ошибка `registration.update()`;
- offline во время install;
- timeout activation;
- обновление при открытых нескольких вкладках;
- обновление при dirty form.

### Deployment

- новый HTML и старый pod;
- старый HTML и новый pod;
- отсутствующий JS/CSS возвращает `404`, а не HTML;
- assets предыдущего релиза доступны в течение migration window;
- rollback на предыдущую версию;
- изменение `config.js` без пересборки приложения.

### HTTP contract

- `/sw.js`: JavaScript и `no-store`/`no-cache`;
- `/index.html`: HTML и revalidate/no-cache;
- `/config.js`: JavaScript, `no-store`, не входит в precache;
- `/manifest.webmanifest`: `application/manifest+json`;
- hashed `/assets/*`: immutable;
- отсутствующий asset: настоящий `404`;
- SPA route: `index.html` со статусом `200`.

## Приоритет внедрения

### P0

1. Исправить NGINX fallback для assets и Workbox-файлов.
2. Исключить runtime config из precache.
3. Убрать reload через 500 мс, дождаться `activated` ожидающего worker и выполнить один явный reload.
4. Добавить `isUpdating`, timeout и обработку ошибок.

### P1

5. Переработать scheduler проверки обновлений.
6. Устранить дублирование `vite.config.ts`/`vite.config.js`.
7. Исправить MIME manifest.
8. Добавить сохранение форм и координацию вкладок.
9. Настроить хранение assets предыдущего релиза.

### P2

10. Сузить runtime cache matchers и переименовать cache names.
11. Добавить build ID, telemetry и recovery UI.
12. Автоматизировать browser и HTTP-contract тесты.

## Использованные официальные материалы

- [Vite PWA — React integration and periodic updates](https://vite-pwa-org.netlify.app/frameworks/react)
- [Vite PWA — NGINX deployment](https://vite-pwa-org.netlify.app/deployment/nginx)
- [Vite PWA — automatic update risks](https://vite-pwa-org.netlify.app/guide/auto-update)
- [Workbox — handling Service Worker updates](https://developer.chrome.com/docs/workbox/handling-service-worker-updates)
- [Workbox Window lifecycle events](https://developer.chrome.com/docs/workbox/modules/workbox-window)
- [Service Worker lifecycle](https://web.dev/articles/service-worker-lifecycle)
- [Vite — load error handling](https://vite.dev/guide/build#load-error-handling)
- [Vite — dynamic import version skew](https://vite.dev/guide/troubleshooting#failed-to-fetch-dynamically-imported-module)
