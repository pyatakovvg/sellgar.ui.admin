# Разработка

Раздел описывает правила разработки для `sellgar.ui.admin`.

## Быстрый маршрут

- Архитектура приложения: `../architecture.md`.
- Структура пакетов: `core/file-structure.md`.
- Источники истины проекта: `project/source-of-truth.md`.
- Imports: `project/imports.md`.
- Runtime OOP contract: `project/oop-runtime-contract.md`.
- Code style: `project/code-style.md`.
- Стили: `project/styles.md`.
- Checklist изменений: `project/change-checklist.md`.

## Основные команды

```bash
yarn dev:admin_ui
yarn build:admin_ui
yarn test
```

Для проверки client TypeScript и production bundle обычно достаточно `yarn build:admin_ui`.

## Язык документации

Вся документация пишется на русском языке. Имена packages, paths, commands и API identifiers оставляются как code literals.
