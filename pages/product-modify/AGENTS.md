# AGENTS

## Зона ответственности

`@page/product-modify` владеет route-level формой создания и редактирования товара.

## Маршруты

- `/products/create`
- `/products/:uuid`

## Правила

- Product form, variants, gallery integration, loaders и mutations держать здесь.
- Для edit mode page товара использовать route params.
- Loading options для property/category/brand держать за product controller или package-local hooks.
- Не превращать эту route page во frame без изменения route contract.
