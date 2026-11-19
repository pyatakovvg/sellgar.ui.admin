# AGENTS

## Зона ответственности

`@widget/logout` владеет reusable logout control и confirmation flow.

## Правила

- Logout controller, bindings и confirmation UI держать здесь.
- Auth/session services использовать через local controller bindings.
- Logout выполнять через widget action; состояние выполнения читать из `useSubmit`.
- После `SessionRuntimeStateInterface.setAnonymous()` не выполнять ручной redirect: route policy владеет переходом на `/sign-in`.
- Sidebar layout behavior сюда не относится; layout решает, где render-ится widget.
- Modal copy и actions должны быть сфокусированы на logout.
