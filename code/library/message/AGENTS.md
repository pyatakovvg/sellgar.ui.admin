# AGENTS

## Зона ответственности

`@library/message` владеет shared message/notification integration.

## Правила

- Notification store/presenter behavior должен оставаться application-agnostic.
- Не импортировать feature packages.
- Использовать пакет для shared message infrastructure, а не для feature-specific copy.
