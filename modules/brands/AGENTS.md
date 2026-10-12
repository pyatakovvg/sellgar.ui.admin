# AGENTS

## Зона ответственности

`@module/brands` владеет route списка брендов.

## Правила

- Loader списка, table и header держать здесь.
- Для создания использовать `BrandCreateRoute`; строка таблицы открывает `BrandReviewRoute`.
- Использовать текущий `Table` из `@sellgar/kit`.
- Row click является primary edit/open action для brand rows.
- Список использует `BrandResultEntity` с `@EntityCollection`, элементы —
  `BrandEntity` с identity `code`. Таблица и ячейки имени/описания подключены
  через `reactive`; создание/изменение бренда обновляет их без ревалидации loader.
