# AGENTS

## Зона ответственности

`@frame/brand-modify` владеет drawer-frame создания и редактирования бренда.

## Runtime-Контракт

- Hash source: `brand`.
- Shell: drawer.
- Создание открывается из `@module/brands` через `BrandCreateRoute`; редактирование — из просмотра через `BrandModifyRoute`.

## Правила

- Form бренда, loader, create/update requests и bindings держать внутри этого пакета.
- Edit loaders читают `code` из `args.params`.
- Создание и изменение — отдельные сценарии controller. После успешного
  ответа создания применять `insertEntity(BrandEntity, brand)`, после изменения
  — `updateEntity(BrandEntity, brand)`. `BrandEntity` идентифицируется по `code`,
  `BrandResultEntity.items` объявлен через `@EntityCollection`.
- Переход после сохранения на `BrandReviewRoute` использует код из ответа и
  `revalidate: false`. Данные списка обновляются реактивно; не добавлять
  ревалидацию или дополнительное чтение бренда в action. При отмене редактирования
  возвращаться в просмотр без ревалидации; при отмене создания закрывать frame.
- Новый `File` хранить в объекте формы и передавать в controller action через `useSubmit` без сериализации и предварительной загрузки.
- Несохранённые изменения формы защищать через `useBlocker(formState.isDirty)`.
  Только переход после успешного сохранения выполнять через scoped
  `NavigationBlockerServiceInterface.allow()`. Не отключать блокер на время
  запроса или при обычном закрытии frame.
- Не добавлять в форму транспортные `localId` и `fileName`: multipart-контракт формирует brand gateway.
