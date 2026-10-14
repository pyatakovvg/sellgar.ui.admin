# AGENTS

`@frame/store-review` владеет просмотром товара витрины по `StoreReviewRoute`.

- Loader получает uuid из route token и вызывает StoreServiceInterface.findByUuid.
- Просмотр показывает магазин, товар, варианты, цены, видимость и учетные записи с остатками. Не содержит формы, сохранения или inventory-команд.
- Редактирование открывается через controller и StoreModifyRoute.
- Клик по строке учетной записи открывает StoreInventoryRoute через controller с storeProductUuid предложения и uuid выбранной записи. Inventory-команды остаются в существующем фрейме управления остатками.
- Presentation использует FrameLayout, InfoLine, Divider и Table из существующих design/kit. Общий Drawer принадлежит application.
