# AGENTS

## Зона ответственности

`@frame/shop-modify` владеет drawer-frame создания и редактирования магазина.

## Runtime-Контракт

- Hash source: `shop`.
- Shell: drawer.
- Открывается из `@module/shops` по tokens `ShopCreateRoute` и `ShopModifyRoute`.

## Правила

- Form магазина, loader, create/update requests и bindings держать внутри этого пакета.
- Edit loader читает `uuid` из `args.params`; без `uuid` возвращает `undefined` для пустой формы создания.
- Action без `uuid` создаёт магазин; с `uuid` обновляет существующий. UUID не является полем формы.
- После успешной записи открывается `ShopReviewRoute` с `revalidate: true`, как в существующем edit workflow.
- Отмена создания закрывает nested router; отмена редактирования возвращает к просмотру магазина.
