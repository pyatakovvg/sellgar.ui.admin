# AGENTS

## Зона ответственности

`@page/dashboard` владеет root private dashboard route.

## Правила

- Dashboard UI держать route-local.
- Не размещать здесь global navigation или auth logic.
- Domain data loaders добавлять только если dashboard реально показывает эти данные.
