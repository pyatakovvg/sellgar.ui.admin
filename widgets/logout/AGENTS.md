# AGENTS

## Зона ответственности

`@widget/logout` владеет reusable logout control и confirmation flow.

## Правила

- Logout controller, store, bindings и confirmation UI держать здесь.
- Auth/session services использовать через local controller bindings.
- Sidebar layout behavior сюда не относится; layout решает, где render-ится widget.
- Modal copy и actions должны быть сфокусированы на logout.
