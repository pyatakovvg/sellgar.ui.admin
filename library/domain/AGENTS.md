# AGENTS

## Зона ответственности

`@library/domain` владеет domain entities, repositories, gateways, services и HTTP helpers.

## Правила

- Backend DTO mapping и HTTP calls держать здесь.
- Stable services/entities экспортировать через `src/index.ts`.
- Не импортировать UI packages, pages, frames, widgets или layouts.
- UI-specific form DTO держать в owning page/frame, если это не настоящий domain contract.
- Разделение backend сервисов отражать явно: catalog product/variant идут через
  product gateway, shop через shop gateway, store product/price/currency через
  store gateway.
- Не переносить legacy product store DTO в новую store model без проверки
  backend-контракта.
