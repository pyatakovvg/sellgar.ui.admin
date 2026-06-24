# Стили

## Глобальные Стили

Глобальные стили приложения находятся в `clients/admin/src/styles/index.css`. Стили kit импортируются в `clients/admin/src/main.tsx`:

- `@sellgar/kit/icons.css`;
- `@sellgar/kit/geologica.css`;
- `@sellgar/kit/theme.css`.

## CSS-Модули

Для package-local styling использовать CSS modules:

```tsx
import s from './default.module.scss';
```

Селекторы должны оставаться локальными для component. Не таргетить internals kit, если kit не предоставляет supported styling hook.

## Layout

- `layouts/navigate` владеет sidebar/navigation layout.
- Feature packages не должны patch-ить sidebar sizing или global shell spacing.
- Sticky behavior принадлежит component или page, который владеет scroll container.

## Design Tokens

Предпочитать kit tokens и component props, а не hard-coded visual values. Локальный CSS добавлять только для composition gaps, которые kit не закрывает.
