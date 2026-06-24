# Документы Для Агентов

Эти заметки предназначены для агентской работы в `sellgar.ui.admin`.

## С чего начинать

1. Прочитать корневой `AGENTS.md`.
2. Проверить ближайший package-level `AGENTS.md`.
3. Перед изменениями посмотреть текущий source.
4. Держать изменения внутри owning package.

## Файлы с высоким сигналом

- Routes: `clients/admin/src/application/admin.application.tsx`.
- Host bindings: `clients/admin/src/application/bindings/admin.bindings.ts`.
- Sidebar: `layouts/navigate`.
- Актуальные примеры frames: `frames/*`.
- Актуальные примеры таблиц: `pages/brands`, `pages/categories`, `pages/products`, `pages/properties`.

## Гигиена документации

Документация должна быть на русском языке. Имена packages, paths, commands и API identifiers оставляются как code literals.

Этот docs tree был адаптирован из другого проекта. Не возвращать старые project names, старые route examples или obsolete aliases. Каждый пример должен соответствовать существующему package либо быть явно помечен как generic.
