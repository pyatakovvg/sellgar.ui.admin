# AGENTS

## Зона ответственности

`@frame/category-modify` владеет drawer-frame создания и редактирования категории.

## Runtime-Контракт

- Hash source: `category`.
- Shell: drawer.
- Открывается из `@page/categories` через `useFrame(CategoryModifyFrame)`.

## Правила

- Form категории, loader, create/update requests и bindings держать внутри этого пакета.
- Edit loaders должны читать `uuid` из frame open props.
- При изменении полей сохранять поведение дерева и parent category.
- Новый `File` хранить в объекте формы и передавать в controller action через `useSubmit` без сериализации и предварительной загрузки.
- Не добавлять в форму транспортные `localId` и `fileName`: multipart-контракт формирует category gateway.
