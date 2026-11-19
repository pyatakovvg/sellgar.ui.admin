# CI и выпуск админки

Цикл: `development → release/<version> → master → development`.
Все jobs работают на GitHub-hosted runners. Kubeconfig и сетевой доступ к кластеру
не передаются в GitHub. Значения Kubernetes Secrets в Git и Helm-пакеты не входят.

## Development

Push в `development` выполняет `build → smoke → publish → publish-dev-release`.
Последний job использует общий delivery action, закреплённый по SHA в
`sellgar.infrastructure/.github/actions/publish-helm`.

Он получает `helm/values.app.yaml` и `helm/dev/values.yaml` из source commit образа,
включает общий chart и закрепляет image digest. После lint/render публикует пакет
`ghcr.io/pyatakovvg/helm/sellgar-ui-admin-dev:0.<run-id>.<attempt>`.
Argo CD следит за версиями этого Helm OCI repository и автоматически применяет новый
пакет. Коммитов в infrastructure на каждый выпуск нет. Изменение конфигурации попадёт
в кластер вместе с образом только после успешной CI-публикации пакета.

Неизменяемая версия пакета упорядочена по CI run ID и attempt: старый медленный build
не заменяет уже опубликованный более новый выпуск. ConfigMap и image digest находятся
в одном пакете. Digest не определяется по mutable `latest`.

Успешный CI означает публикацию проверенных артефактов; здоровье rollout проверяется
в Argo CD (`Synced`, `Healthy`) и readiness Kubernetes. Публикация не выдаётся за
подтверждение готовности пода.

## Релиз и production

Push в `release/*` выполняет build/smoke/publish и сохраняет Artifact
`release-manifest`. Stage пока не развёрнут; название `stage` в manifest не создаёт среду.
PR в `development`, `release/*`, `master` выполняет проверки без публикации.

В `master` допускается PR только из `release/*` того же repository. Слияние не запускает
production автоматически. Для выпуска открыть **Release to production → Run workflow**
из `master` и указать ID успешной CI-сборки выбранной ветки `release/*`.

Workflow проверяет происхождение кандидата, успешность CI, merge в master и полное
совпадение Git tree. Затем скачивает уже проверенный image digest, проверяет OCI labels,
повторяет HTTP smoke и повторно проверяет master. Образ не пересобирается.

После проверки публикуется Helm-пакет `ghcr.io/pyatakovvg/helm/sellgar-ui-admin-prod`
с тем же image digest и `helm/prod/values.yaml` выбранного кандидата. Только ручной
workflow из master имеет право публиковать prod-пакет. У dev и prod разные OCI repositories.
Prod Argo CD подключается к своему repository при развёртывании production-среды;
сейчас prod-кластер не настроен и не затрагивается.

После успешной публикации создаётся или переиспользуется PR `master → development`.
Автоматическое approve/merge не выполняется. Эта операция означает возврат исходников
в цикл разработки, а не подтверждение здоровья production rollout.

## Настройки GitHub и Kubernetes

- `SUBMODULES_READ_TOKEN`: доступ на чтение приватных вложенных repositories,
  если им недоступен штатный `GITHUB_TOKEN`. Fork PR не получает этот Secret.
- Публикация image и chart использует `GITHUB_TOKEN` с `packages: write`
  только в соответствующих jobs. Для заранее созданного GHCR package repository
  должен иметь доступ через package Actions access. Production job тоже публикует
  chart, но не пересобирает образ.
- Для обратного PR включить **Settings → Actions → General → Workflow permissions →
  Allow GitHub Actions to create and approve pull requests**. Автоматический approve
  в workflow не используется. Созданный токеном PR может потребовать запуска checks.
- Для `master` настроить protection/ruleset: PR и успешные checks без обхода.
  Workflow проверяет источник PR, но не настраивает защиту ветки.
- Argo CD repo-server получает отдельную настройку Helm OCI repository с правом
  чтения GHCR. Это Secret кластера, а не GitHub credential для Kubernetes.
- `helm/*/values.yaml` содержит только публичную конфигурацию и ссылки на Secrets.
  `config.js` по-прежнему монтируется ConfigMap в runtime и не встраивается в build.

## Проверки

```bash
python3 -B -m unittest discover -s .github/scripts -p 'test_*.py'
python3 .github/scripts/smoke-image.py sellgar-admin-ui:local
```

Workflow проверяется `actionlint`. Общий delivery action проверяет эквивалентность
render прежнему chart: selectors, ConfigMap, Ingress, образ и порядок наложения values.
Фактическая доставка проверяется облачным CI и последующей автоматической синхронизацией
Argo CD в dev; запись version/digest в инфраструктурный Git для такой проверки не нужна.
