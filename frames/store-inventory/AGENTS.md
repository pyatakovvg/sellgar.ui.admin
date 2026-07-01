# AGENTS

## Зона ответственности

`@frame/store-inventory` владеет modal-frame ручного управления остатком одного store offer.

## Runtime-Контракт

- Hash source: `store-inventory`.
- Shell: modal.
- Открывается из вложенной таблицы offer-ов на странице `@page/store`.

## Правила

- Frame получает `storeProductUuid` и `offerUuid` из open props.
- Loader загружает store product, находит offer и отдает модалке товар, магазин, вариант и inventory.
- Форма не обновляет `store_product` или `store_offer`; она вызывает только inventory-команды `adjust`, `receipt`, `writeOff`.
- Количество относится к `offer.inventory`, а не к catalog variant и не к форме `store-modify`.
