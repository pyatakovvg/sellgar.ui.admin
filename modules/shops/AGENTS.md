# AGENTS

## Зона ответственности

`@module/shops` владеет route списка магазинов `/shops`.

## Правила

- Loader списка магазинов и route UI держать здесь.
- Store item behavior сюда не относится; складские позиции принадлежат `@module/store` и `@frame/store-modify`.
- Domain shop services использовать через package-local controller bindings.
- Использовать новый `Table` из `@sellgar/kit/table`: внешний вертикальный scroll owner,
  виртуализация, `data.getRowId` по `uuid`, размер строк `lg`.
- Название — auto, ИНН имеет ширину 144. Resize выключен.
- Ячейки получают `ShopEntity` через `Cell.render`, без legacy `useCellData`.
- Клик строки открывает `ShopReviewRoute`; фильтр списка остаётся у `ShopController`.
