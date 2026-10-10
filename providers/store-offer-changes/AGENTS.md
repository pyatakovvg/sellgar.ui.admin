# Store offer changes provider

- Пакет `@provider/store-offer-changes`; публичный экспорт — `StoreOfferChangesProvider`.
- Подключается в `@module/store`.
- `store.product.updated` обновляет `StoreProductEntity`, включая его offers.
- Hub валидирует входящие сообщения перед передачей provider.
- Реализация Hub и bindings остаются внутри пакета.
