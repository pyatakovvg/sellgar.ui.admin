# AGENTS

## Зона ответственности

`widgets/*` владеют встраиваемыми reusable UI blocks.

## Текущие пакеты

- `widgets/logout` - logout control.
- `widgets/gallery` - reusable gallery UI.

## Правила

- Widgets использовать для UI, который встраивается в pages/layouts/frames.
- Widget controllers и bindings держать локально, если widget владеет behavior.
- Использовать `@sellgar/kit` и hooks из `@sellgar/app`, когда это подходит.

## Нельзя

- Не использовать widgets как drawer/modal feature containers.
- Не делать widgets зависимыми от private files страниц.
