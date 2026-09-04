# AGENTS

## Зона ответственности

`widgets/*` владеют встраиваемыми reusable UI blocks.

## Текущие пакеты

- `widgets/logout` - logout control.
- `widgets/theme` - theme preference control.
- `widgets/gallery` - reusable gallery UI.

## Правила

- Widgets использовать для UI, который встраивается в pages/layouts/frames.
- Widget controllers и bindings держать локально, если widget владеет behavior.
- Runtime Widget, controllers, bindings, providers и hooks реализовывать через
  `@sellgar/app` и `@sellgar/app/react`.
- `widgets/gallery` сейчас не содержит runtime declaration и потребителей;
  не создавать фиктивный `WidgetDefinition` без реального reusable use case.

## Нельзя

- Не использовать widgets как drawer/modal feature containers.
- Не делать widgets зависимыми от private files страниц.
