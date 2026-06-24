# AGENTS

## Зона ответственности

`@library/push` владеет shared push/service-worker support.

## Правила

- Browser push и service-worker helpers должны оставаться application-safe.
- Не импортировать pages, frames, widgets или layouts.
- UI обновлений service worker принадлежит `clients/admin/src/sw`, если он не стал shared.
