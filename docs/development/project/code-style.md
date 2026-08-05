# Стиль Кода

## TypeScript

- Для controllers и services предпочитать explicit public interfaces.
- Публичный API package держать в `src/index.ts`.
- Локальные implementation files держать private, если другому package не нужен stable export.
- Не делать broad refactors при исправлении narrow runtime/UI bugs.

## React

- View components должны быть небольшими и package-local.
- Для navigation, frame access, controllers и loader data использовать runtime hooks из `@sellgar/app`.
- Для kit form inputs, которым нужна controlled integration, использовать `react-hook-form` controllers.
- По возможности инициализировать form values напрямую из loader data.

## Именование

- Page packages: `@page/<feature>`.
- Frame packages: `@frame/<feature>-modify`.
- Widget packages: `@widget/<name>`.
- Controller interfaces заканчиваются на `ControllerInterface`.
- CSS modules импортируются как `s`.

## UI Kit

- Использовать components из `@sellgar/kit` вместо локальных ad hoc controls.
- Использовать SVG icons из `@sellgar/kit/icons`.
- Не добавлять font-icon based code для новой работы.

## Документация

Вся документация пишется на русском языке. Технические имена, paths, commands и API identifiers оставлять в code literals.
