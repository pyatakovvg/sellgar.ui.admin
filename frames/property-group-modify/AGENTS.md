# AGENTS

## Зона ответственности

`@frame/property-group-modify` владеет modal-frame создания и редактирования группы характеристик.

## Runtime-Контракт

- Hash source: `property-group`.
- Shell: modal.
- Открывается из `@page/properties` через `useFrame(PropertyGroupModifyFrame)`.

## Правила

- Form группы характеристик, loader, create/update requests и bindings держать внутри этого пакета.
- Edit loaders должны читать `uuid` из frame open props.
- Не смешивать form state группы характеристик с form state отдельной характеристики.
