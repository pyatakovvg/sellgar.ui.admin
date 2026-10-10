# Product changes provider

- Пакет `@provider/product-changes`; публичный экспорт — `ProductChangesProvider`.
- Подключается в `@module/products` и `@module/product-modify`.
- `product.created` добавляет `ProductSummaryEntity` в открытый список товаров.
- `product.updated` обновляет `ProductEntity` и `ProductSummaryEntity`.
- Hub валидирует входящие сообщения и передаёт контекст текущего route для `product.created`.
- Реализация Hub и bindings остаются внутри пакета.
