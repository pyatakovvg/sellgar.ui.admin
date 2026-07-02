# AGENTS

## Зона ответственности

`@page/shops` владеет route списка магазинов `/shops`.

## Правила

- Loader списка магазинов и route UI держать здесь.
- Store item behavior сюда не относится; складские позиции принадлежат `@page/store` и `@frame/store-modify`.
- Domain shop services использовать через package-local controller bindings.
