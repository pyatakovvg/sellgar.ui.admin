# Helm chart админки

Этот каталог предназначен для chart приложения: `Chart.yaml`, общих defaults,
схемы values и Kubernetes templates.

Chart пока не реализован. Текущий этап — перенос исходников в `code/`,
контейнерная сборка и CI релизного цикла.

CI и ручная подготовка production-выпуска экспортируют `image-values.yaml`
с `image.repository` и `image.digest`. Chart должен собирать image reference
как `repository@digest`; пересборка для среды не требуется. Подключение CD
описано в `docs/ci-release-cycle.md`.

Значения конкретных сред хранятся в репозитории `sellgar.infrastructure`:
`environments/<dev|prod>/services/admin-ui/values.yaml`.
Шаблоны сервиса и общие defaults принадлежат этому репозиторию.

Конфигурация Nginx находится в `code/clients/admin/nginx/` и включается в образ.
Публичный runtime `config.js` будет передаваться через ConfigMap при реализации
chart; текущий локальный файл находится в `code/clients/admin/public/config.js`.
