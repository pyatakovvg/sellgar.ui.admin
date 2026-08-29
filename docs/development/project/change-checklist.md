# Checklist Изменений

Использовать этот checklist перед закрытием UI/runtime changes.

## Область Изменения

- Измененный package владеет behavior.
- Feature logic не перенесена в `clients/admin`.
- Изменения shared libraries реально общие и не импортируют feature/domain internals.
- Documentation changes написаны на русском языке.

## Runtime

- Routes и nested frame routers зарегистрированы в `clients/admin/src/application/routes`.
- Page data использует module controller loader data.
- Frame data использует frame controller loader data.
- Frame loaders читают tokenized route params из `args.params`.
- Navigation использует `@library/route-tokens`, без строковых URL и `react-router-dom`.
- Drawer forms живут в `frames/*`, используют единый application shell и не создают отдельный Modal shell.

## UI

- Components берутся из `@sellgar/kit`.
- Icons берутся из `@sellgar/kit/icons`.
- Tables используют текущий kit `Table`.
- Основное действие строки доступно через click по row, если screen pattern этого ожидает.
- Sidebar/navigation остается согласованным между desktop и tablet layouts.

## Проверка

- Запускать самую узкую полезную проверку.
- Для client-wide TypeScript/bundle checks использовать `yarn build:admin_ui`.
- Для docs-only changes проверять stale project names через `rg`.
