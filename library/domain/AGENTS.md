# AGENTS

## Зона ответственности

`@library/domain` владеет domain entities, repositories, gateways, services и HTTP helpers.

## Правила

- Backend DTO mapping и HTTP calls держать здесь.
- Stable services/entities экспортировать через `src/index.ts`.
- Не импортировать UI packages, pages, frames, widgets или layouts.
- UI-specific form DTO держать в owning page/frame, если это не настоящий domain contract.
