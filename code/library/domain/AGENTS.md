# AGENTS

## Зона ответственности

`@library/domain` владеет domain entities, repositories, gateways, services и HTTP helpers.

## Правила

- Backend DTO mapping и HTTP calls держать здесь.
- Stable services/entities экспортировать через `src/index.ts`.
- Не импортировать UI packages, modules, frames, widgets или layouts.
- UI-specific form DTO держать в owning page/frame, если это не настоящий domain contract.
- Разделение backend сервисов отражать явно: catalog product/variant идут через
  product gateway, shop через shop gateway, store product/price/currency через
  store gateway.
- Не переносить legacy product store DTO в новую store model без проверки
  backend-контракта.

## Корзины

- Срез `classes/cart` подключён через `DomainBinding`. Публичный порт —
  `CartServiceInterface`: `getAll`, `findByUuid`, `addItem`, `setItemQuantity`, `removeItem`.
- Источник контракта — административная ветка `/v1/carts` gateway. Список содержит
  `CartSummaryEntity`, карточка — `CartEntity`; результат команды — `CartItemMutationEntity`.
- `addItem` увеличивает количество, `setItemQuantity` задаёт абсолютное значение.
  Технических ключей внутренних команд Cart в frontend Input/DTO нет;
  backend gateway добавляет их при обращении к сервису.
- `version` для изменения/удаления берётся из `CartItemEntity.version`.
  Версии и денежные суммы остаются строками. DELETE передаёт тело JSON.
- Недоступные позиции, сообщения и флаги действий сохраняются из ответа API.
  Ответ команды не подменяет полную карточку; после записи её можно загрузить повторно.
- Приватный клиентский канал `/socket.io/carts` не предназначен для админского
  broadcast-ticket. Административный realtime Cart требует отдельного audience-контракта.
- В Entity нет версий backend-проекций и UUID внутреннего оформления.
  availableQuantity — доступное количество; cartVersion в результате записи —
  версия корзины. itemsCount считает позиции, а не сумму quantity.
