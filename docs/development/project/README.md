# Правила Разработки Проекта

Правила для ежедневной работы в `sellgar.ui.admin`.

- Текущий source является источником истины.
- Feature logic держать в `pages/*`, `frames/*` или `widgets/*`.
- `clients/admin` держать как composition root.
- Для UI использовать `@sellgar/kit`, для SVG-иконок - `@sellgar/kit/icons`.
- Использовать runtime contracts из `@sellgar/app`, React API из `@sellgar/app/react` и tokens из `@library/route-tokens`.
- Для Drawer forms использовать frames и общий application shell, а не widgets или отдельный Modal shell.
- Документацию писать на русском языке.

См. также:

- `source-of-truth.md`
- `imports.md`
- `oop-runtime-contract.md`
- `code-style.md`
- `styles.md`
- `change-checklist.md`
