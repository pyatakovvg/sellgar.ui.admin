# Правила Разработки Проекта

Правила для ежедневной работы в `sellgar.ui.admin`.

- Текущий source является источником истины.
- Feature logic держать в `pages/*`, `frames/*` или `widgets/*`.
- `clients/admin` держать как composition root.
- Для UI использовать `@sellgar/kit`, для SVG-иконок - `@sellgar/kit/icons`.
- Использовать runtime decorators и hooks из `@tiyn/app`; не пересоздавать routing/frame state локально.
- Для drawer/modal forms предпочитать frames, а не widgets.
- Документацию писать на русском языке.

См. также:

- `source-of-truth.md`
- `imports.md`
- `oop-runtime-contract.md`
- `code-style.md`
- `styles.md`
- `change-checklist.md`
