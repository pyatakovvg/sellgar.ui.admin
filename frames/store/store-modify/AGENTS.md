# AGENTS

## Зона ответственности

`@frame/store-modify` владеет drawer-frame создания и редактирования складской позиции.

## Runtime-Контракт

- Route tokens: `StoreCreateRoute`, `StoreModifyRoute`.
- Shell: общий application-level Drawer.
- Открывается из `@module/store` через tokenized navigation.

## Правила

- Store form, loader, auxiliary hooks, create/update requests и bindings держать внутри этого пакета.
- Edit loaders читают `uuid` из route params.
- При изменении workflow сохранять секции prices, shop, currency и variant.
- Currency выбирается как бизнес-сущность `currency`; не вводить
  UI-специфичные аналоги вроде `shopCurrency` или `variantCurrency`.
- Price history отображает историю цен предложения store, а не цену catalog
  product/variant.
- Не использовать sticky page layout внутри list workflow `/store`.

- Форма редактирует цену/видимость варианта и его учетные записи: артикул, упорядоченные текстовые уточнения. Новый вариант предзаполнен одной записью; можно добавить другие. Пустой артикул новой записи генерирует сервис. Persisted UUID сохраняется при редактировании, остатки не включаются в metadata-команду.
- Удалять из формы можно только несохраненные дополнительные записи. Backend не удаляет существующие записи при их пропуске в команде; UI не обещает такого удаления.
- Остатки показаны по записям и открываются через `recordUuid`; изменения формы защищены штатным `useBlocker`.

- StoreReviewRoute открывает отдельный просмотр. Редактирование: #store/:uuid/edit; создание: #store/create. Сохранение возвращает просмотр сохраненного uuid; отмена редактирования — просмотр исходного uuid через штатный blocker.
