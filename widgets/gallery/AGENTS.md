# AGENTS

## Зона ответственности

`@widget/gallery` владеет reusable gallery UI.

## Правила

- Gallery UI должен оставаться reusable для product/form owners.
- Product mutation flow не принадлежит этому widget.
- Owner-specific поведение передавать через callbacks/props.
- File/domain upload behavior держать вне widget, если это не стало его явным contract.
