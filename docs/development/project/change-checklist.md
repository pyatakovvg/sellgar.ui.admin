# Checklist Изменений

Использовать этот checklist перед закрытием UI/runtime changes.

## Область Изменения

- Измененный package владеет behavior.
- Feature logic не перенесена в `clients/admin`.
- Изменения shared libraries реально общие и не импортируют feature/domain internals.
- Documentation changes написаны на русском языке.

## Runtime

- Routes и frames зарегистрированы в `AdminApplication` только если они нужны navigation.
- Page data использует module controller loader data.
- Frame data использует frame controller loader data.
- Hash-frame loaders читают open props из `args.props`.
- Drawer/modal forms живут в `frames/*`, а не в `widgets/*`.

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
