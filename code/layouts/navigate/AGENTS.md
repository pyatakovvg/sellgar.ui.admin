# AGENTS

## Зона ответственности

`@layout/navigate` владеет authenticated shell, sidebar и навигационным layout.

## Правила

- Sidebar state, menu structure и navigation spacing принадлежат этому пакету.
- Использовать sidebar/menu components из `@sellgar/kit`.
- Использовать SVG-иконки из `@sellgar/kit/icons`.
- Desktop/tablet поведение должно оставаться согласованным.
- Не добавлять page-specific loaders или mutations.
- Theme и logout controls рендерить через `WidgetHost` с публичными tokens
  `ThemeWidget` и `LogoutWidget`.

## Структура

- `src/navigate.layout.ts` содержит только declaration и metadata.
- `src/view/layout.view.tsx` выбирает отображение shell по размеру экрана.
- `src/view/hooks` содержит локальный hook размера экрана.
- `src/view/desktop/aside` разделяет профиль, навигацию и нижние действия.
- Компонент пункта меню принадлежит `navigation/navigation-item`.
- Desktop и tablet используют `Desktop`, mobile — `Mobile`.
- Публичный фасад экспортирует только `NavigateLayout`.
