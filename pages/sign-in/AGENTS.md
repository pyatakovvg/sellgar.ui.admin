# AGENTS

## Зона ответственности

`@page/sign-in` владеет public route входа.

## Правила

- Auth form state, submit flow и sign-in UI держать здесь.
- Authenticated shell behavior сюда не относится.
- Redirect/navigation behavior должен быть согласован с auth policies в `AdminApplication`.
- Auth services из `@library/domain` использовать через local controller bindings.
