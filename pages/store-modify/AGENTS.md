# AGENTS

## Зона ответственности

`@page/store-modify` владеет legacy route-level формой создания и редактирования складской позиции.

## Маршруты

- `/store/create`
- `/store/:uuid`

## Правила

- Сохранять совместимость пакета, пока routes все еще ссылаются на него.
- Новая drawer/modal работа со складскими позициями должна идти в `@frame/store-modify`.
- Не дублировать fixes между page и frame вслепую; сначала определить, какой route владеет broken behavior.
- Store form работает с новой моделью `store_srv`: shop, variant, currency,
  price history и inventory не должны маппиться на legacy product store.
