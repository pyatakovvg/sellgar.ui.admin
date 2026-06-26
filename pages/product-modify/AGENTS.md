# AGENTS

## Зона ответственности

`@page/product-modify` владеет route-level формой создания и редактирования товара.

## Маршруты

- `/products/create`
- `/products/:uuid`

## Правила

- Форму товара, варианты, интеграцию галереи, loaders и mutations держать здесь.
- Изображения относятся к варианту товара, не к базовому продукту. Галерея
  должна жить внутри формы варианта и работать с `variant.images`.
- Для сохраненных изображений используйте CDN/media URL из `FileService.getPublicImageUrl(uuid)`.
- `blob:` URL в галерее товара не использовать. При выборе файла сначала
  загрузить его через файловый CRUD и хранить в форме только `imageUuid`.
  Пока идет upload, блокировать кнопку выбора и показывать состояние обработки.
- Не собирайте `/v1/files/:uuid` URL в форме.
- Для edit mode page товара использовать route params.
- Loading options для property/category/brand держать за product controller или package-local hooks.
- Не превращать эту route page во frame без изменения route contract.
