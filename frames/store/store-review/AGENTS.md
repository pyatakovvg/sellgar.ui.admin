# AGENTS

`@frame/store-review` владеет просмотром товара витрины по `StoreReviewRoute`.

- Loader получает uuid из route token и вызывает StoreServiceInterface.findByUuid.
- Просмотр показывает магазин, товар, варианты, цены, видимость и учетные записи с остатками. Не содержит формы, сохранения или inventory-команд.
- Редактирование открывается через controller и StoreModifyRoute.
- Клик по строке учетной записи открывает StoreInventoryRoute через controller с storeProductUuid предложения и uuid выбранной записи. Inventory-команды остаются в существующем фрейме управления остатками.
- Presentation использует FrameLayout, InfoLine, Divider и Table из существующих design/kit. Общий Drawer принадлежит application.
- Учётные записи используют `@sellgar/kit/table`: `sm`, `secondary`, внешний scroll owner,
  виртуализация, стабильный `uuid`; sticky header и resize выключены. Entry — auto.
- Ячейки `Entry`/`Quantity` сохраняют reactive-границы и получают запись через `Cell.render`.
