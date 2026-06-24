# AGENTS

## Зона ответственности

`@frame/unit-modify` владеет drawer-frame создания и редактирования единицы измерения.

## Runtime-Контракт

- Hash source: `unit`.
- Shell: drawer.
- Открывается из `@page/units` через `useFrame(UnitModifyFrame)`.

## Правила

- Form единицы измерения, loader, create/update requests и bindings держать внутри этого пакета.
- Edit loaders должны читать `uuid` из frame open props.
- Unit-specific validation и captions держать локально во frame.
