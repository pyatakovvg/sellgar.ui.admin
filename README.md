# Админка Sellgar

Админский интерфейс Sellgar. Репозиторий собран как Yarn workspaces, основной клиент находится в `code/clients/admin`.

## Структура репозитория

- `code/` — Yarn workspaces, исходники и инструменты разработки.
- `code/clients/admin/nginx/` — `nginx.conf` и `conf.d/default.conf`.
- `Dockerfile` и `.dockerignore` — контейнерная сборка из корня репозитория.
- `.github/workflows/ci.yml` — сборка образа, smoke-проверка и публикация в GHCR.
- `.github/workflows/production.yml` — ручная подготовка production-выпуска без пересборки.
- `helm/values.app.yaml` — общие настройки запуска: порт, volumes, probes, ingress path.
- `helm/dev/values.yaml`, `helm/prod/values.yaml` — настройки сред и ConfigMap с `config.js`.
- Общий chart — `sellgar.infrastructure/charts/application`; templates в приложении нет.
- `docs/` — документация; `.gitmodules` — пути вложенных библиотек.

## Стек

- React 19, Vite, TypeScript.
- Runtime приложения: `@sellgar/app`.
- Route tokens: отдельный пакет `@library/route-tokens`.
- DI: bindings из `@sellgar/app` и `inversify`.
- UI kit: `@sellgar/kit`, иконки из `@sellgar/kit/icons`.
- Доменный слой и HTTP: `@library/domain`.

## Входные точки

- `code/clients/admin/src/main.tsx` подключает стили `@sellgar/kit` и глобальные стили.
- `code/clients/admin/src/bootstrap.tsx` создает `AdminApplication`, рендерит React root и запускает initializer.
- `code/clients/admin/src/application/admin.application.tsx` описывает application-wide components, shell, initializers и features; route graph находится в `src/application/routes`.
- `code/clients/admin/src/application/bindings/admin.bindings.ts` регистрирует application/domain зависимости.
- `code/clients/admin/src/sw/service-worker.tsx` показывает UI обновления service worker.

## Рабочие области

- `code/clients/admin` - host-приложение и composition root.
- `code/layouts/*` - layout-пакеты приложения.
- `code/modules/*` - route-level страницы.
- `code/frames/*` - вложенные route workflows, отображаемые через единый application-level `Drawer`.
- `code/widgets/*` - переиспользуемые встраиваемые UI-блоки.
- `code/providers/*` - отдельные пакеты `@provider/*` для переиспользуемых runtime providers.
- `code/library/*` - общие библиотеки runtime/design/domain/message/push.
- `code/utils/*` - общие утилиты без UI.

## Основные маршруты

- `/sign-in` - публичный вход.
- `/` - dashboard.
- `/shops` - магазины.
- `/products` - список товаров, `/products/create` и `/products/:uuid` - форма товара.
- `/store` - складские позиции и вложенные drawer routes.
- `/brands`, `/categories`, `/units`, `/properties` - списки и вложенные create/edit drawer routes.

## Скрипты

```bash
cd code
yarn install --immutable
yarn dev:admin_ui
yarn build:admin_ui
yarn test
```

## Документация

- `docs/architecture.md` - карта приложения и границы пакетов.
- `docs/development` - правила разработки и runtime-контракты.
- `docs/design` - процесс проектирования изменений.
- `docs/agent` - инструкции для агентской работы.

## Контейнер и CI

Из корня репозитория:

```bash
docker build -t sellgar-admin-ui:local .
docker run --rm -p 127.0.0.1:8080:8080 sellgar-admin-ui:local
```

Контейнер обслуживает `/admin/`; `/admin` перенаправляется на `/admin/`.
Браузерные маршруты, assets и service worker используют этот префикс.
Локальный Vite dev server продолжает работать от `/` на порту 3000.

Образ собирается на Node 24 и обслуживается Nginx 1.30.7 без root.
SPA routes возвращают `index.html`; `config.js` и service worker не сохраняются
в HTTP-кеше, assets с хешами получают длительный cache lifetime.

Для закрытых submodules workflow требует GitHub Actions Secret
`SUBMODULES_READ_TOKEN` с доступом на чтение вложенных репозиториев.
Для доступных через штатный `GITHUB_TOKEN` репозиториев отдельный Secret не нужен.
Перед CI необходимо зафиксировать и опубликовать изменения каждого вложенного
репозитория, затем gitlinks родительского приложения. Checkout использует
зафиксированные commits submodules, а не последние commits их веток.

Цикл разработки: `development → release/<version> → master → development`.

| Событие                                              | Результат                                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| Push в `development`                                 | build → smoke → publish → Helm-пакет → автоматическая синхронизация Argo CD                                   |
| Push в `release/*`                                   | build → smoke → publish, запись кандидата для stage/prod                         |
| PR в `development`, `release/*`, `master`            | Проверки без публикации                                                          |
| Слияние релиза в `master`                            | Автоматического production-выпуска нет                                           |
| `Release to production` → `Run workflow` из `master` | Проверка кандидата, smoke digest, публикация prod Helm-пакета и обратный PR |

Для ручного выпуска указывается ID успешной релизной сборки из её Summary.
Повторной сборки образа нет: результатом становится тот же digest и Artifact
`production-release` с `release.json` и `image-values.yaml` для deployment.
После публикации пакета открывается PR `master → development`; ветки
и автоматическое слияние workflow не создаёт.

Операционные инструкции, GitHub permissions и точки подключения Kubernetes:
[цикл CI и выпуска](docs/ci-release-cycle.md).

Локально ту же smoke-проверку можно выполнить из корня репозитория:

```bash
python3 .github/scripts/smoke-image.py sellgar-admin-ui:local
python3 -B -m unittest discover -s .github/scripts -p 'test_*.py'
```

Сборка образа не зависит от среды. После smoke и публикации CI создаёт Helm-пакет
с проверенным image digest и публичной конфигурацией выбранной среды. Dev-пакет
публикуется автоматически; prod-пакет — только ручным workflow после проверки кандидата.
Argo CD забирает новые версии пакетов из GHCR. CI не обращается к Kubernetes и
не изменяет инфраструктурный Git при каждом выпуске.

Общие values лежат в `helm/values.app.yaml`, параметры и ConfigMap среды — в
`helm/dev/values.yaml` и `helm/prod/values.yaml`. Общий chart включается в пакет
из закреплённой версии delivery action. Изменение ConfigMap вызывает rolling update.
`config.js` содержит только публичные настройки браузера; секреты в него не передаются.

Dev использует `dev.sellgar.io/admin`. Prod ingress отключён до настройки домена,
TLS и самой production-среды. Публикация prod-пакета сама по себе не создаёт эту среду.
