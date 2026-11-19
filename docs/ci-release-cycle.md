# CI и выпуск админки

Цикл: `development → release/<version> → master → development`.
Все jobs выполняются на GitHub-hosted runners. Kubernetes credentials,
настройки сред и секреты работающих сервисов для сборки не нужны.

## Автоматический CI

`.github/workflows/ci.yml` запускается при push в `development` и `release/*`,
а также для PR в `development`, `release/*` и `master`.

1. `build` забирает код и commits submodules, проверяет release safeguards,
   собирает образ `linux/amd64` на Node 24 и Nginx 1.30.7. Передаёт образ
   следующим jobs как Artifact на три дня. Каждый attempt имеет своё имя
   image Artifact; повторный запуск downstream jobs использует output сборки.
2. `smoke` загружает образ и сверяет его ID. Проверяет Nginx без root,
   read-only rootfs, SPA routes, assets, cache headers и внешний `config.js`.
3. `publish` только при push публикует проверенный образ в GHCR без пересборки.
   Возвращает `image` (полный адрес с digest), `digest`, `target_environment`.
   Для `development` назначение — `dev`, для `release/*` — `stage`.

Тег образа: `ghcr.io/<owner>/<repository>:sha-<commit>`. Для deployment
используется digest; тег не является источником идентичности релиза.

Artifact `release-manifest` хранится 90 дней и содержит:

- `release.json`: repository, source branch/commit/tree, CI run ID/attempt,
  назначение и image repository/digest;
- `image-values.yaml`: только `image.repository` и `image.digest`.

Файлы values записываются в JSON-синтаксисе, совместимом с YAML.
Manifest не содержит credentials или конфигурацию среды. При истечении срока
хранения подготовка выпуска завершается ошибкой; нужно подготовить новый
проверенный кандидат. GHCR image должен сохраняться до завершения жизненного
цикла релиза и нужного периода rollback.

## Проверка релиза и ручная кнопка

1. Создать `release/<version>` от `development` и дождаться успешного CI.
2. Проверить кандидата на stage, когда среда будет подключена. Любое исправление
   в release создаёт новую сборку и новый digest; проверяется новый кандидат.
3. Открыть PR из release в `master`. Проверка принимает только `release/*`
   из того же репозитория. Сливать через **Create a merge commit**, сохраняя
   ancestry кандидата; squash/rebase merge для этого перехода не используется.
4. Открыть **Actions → Release to production → Run workflow**. Выбрать ветку
   `master`, ввести `release_run_id` из Summary проверенной релизной сборки.
5. Workflow проверит CI, manifest, ancestry и полное совпадение Git trees
   релиза и master. Если merge добавил отличия, сначала включить их в release
   и проверить новый кандидат. Если master продвинулся после запуска workflow,
   требуется новый ручной запуск.
6. Workflow скачает образ по digest, проверит source/revision labels и выполнит
   smoke. Docker build в production workflow отсутствует.

Ручной `workflow_dispatch` является допуском выпуска и доступен пользователям
с write access. Workflow должен попасть в default branch, чтобы появилась
кнопка. `Review deployments` можно дополнительно подключить при доступности
required reviewers: для приватных repositories на Free/Pro/Team эта защита
[недоступна](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments#required-reviewers).
На неё текущий ручной запуск не полагается.

Успешный job `promote` экспортирует Artifact `production-release` на 90 дней
с production `release.json` и `image-values.yaml`. В записи сохраняются
исходная сборка, тот же digest, master commit и инициатор ручного запуска.
Это подготовленный выпуск; обновления работающего приложения пока нет.

После подготовки job `back-merge` открывает или переиспользует PR
`master → development`. При отсутствии новых commits PR не создаётся.
Слияние выполняется после checks, через merge commit; новые ветки и прямой
push в development workflow не выполняет.

## Подключение Kubernetes

Сборка и ручная подготовка выпуска уже отдают данные для CD:

| Источник             | Данные для deployment                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| CI `publish`         | `image`, `digest`, `target_environment`, Artifact `release-manifest`                                         |
| Production `promote` | `image`, `image_repository`, `image_digest`, `source_commit`, `master_commit`, Artifact `production-release` |

Будущий job `deploy` в production workflow получает outputs через
`needs: promote` и обновляет `image.repository`/`image.digest` в desired state
`sellgar.infrastructure` для prod. Argo CD применяет chart и конфигурацию среды.
После подключения CD job `back-merge` должен зависеть от успешного `deploy`
с проверкой rollout, а не только от `promote`.

Для dev/stage такой же job добавляется после CI `publish`. Stage опционален;
его имя в manifest само по себе не создаёт namespace или среду.
Только job, который реально дождался rollout, может сообщать об успешном deployment.

Общий chart `sellgar.infrastructure/charts/application` использует
`image.repository@image.digest`. Параметры приложения берутся из
`helm/values.app.yaml`, затем накладываются `helm/dev/values.yaml` или
`helm/prod/values.yaml`. Блок `configmaps` среды содержит публичный `config.js`;
он монтируется в `/usr/share/nginx/html/admin/config.js`.
Старые образы до перехода на `/admin/` с этими values несовместимы: нужен digest
новой успешной CI-сборки. Runtime-параметры не передаются в Docker build.
Доступ к Kubernetes и инфраструктурному репозиторию будет принадлежать CD;
в данном CI он не настроен.

## Настройки GitHub перед первым запуском

- `SUBMODULES_READ_TOKEN`: чтение приватных вложенных repositories. Штатный
  `GITHUB_TOKEN` можно использовать только там, где у него есть доступ.
  Обычные PR из fork этот Secret не получают.
- GHCR публикация: автоматический `GITHUB_TOKEN`, `packages: write` только
  у `publish`. Production имеет только чтение package. Если package создан
  заранее, разрешить этому repository нужный доступ в package Actions access.
- Для автоматического обратного PR включить **Settings → Actions → General →
  Workflow permissions → Allow GitHub Actions to create and approve pull requests**.
  Job запрашивает `pull-requests: write`; автоматическое approve/merge не выполняется.
  Checks PR, созданного `GITHUB_TOKEN`, могут ожидать **Approve workflows to run**.
- Для `master` настроить protection/ruleset: только PR и успешные `build`,
  `smoke`, без обхода проверок. Workflow проверяет source PR, но сам не меняет
  настройки защиты веток. `development` также следует защищать checks.
- Все Actions закреплены по commit SHA. Workflow не требует отдельного
  GHCR PAT, kubeconfig или `.env` со значениями среды.

## Локальная проверка

Из корня repository:

```bash
python3 -B -m unittest discover -s .github/scripts -p 'test_*.py'
python3 .github/scripts/smoke-image.py sellgar-admin-ui:local
```

Тесты safeguards не обращаются к GitHub или Kubernetes. Для проверки workflow
используется `actionlint`; фактические permissions, загрузка Artifacts между
GitHub runners и публикация GHCR подтверждаются первым облачным запуском.
