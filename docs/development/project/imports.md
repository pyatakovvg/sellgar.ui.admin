# Импорты

## Импорты Пакетов

Для cross-package imports использовать workspace package aliases:

- `@client/admin`
- `@layout/*`
- `@module/*`
- `@frame/*`
- `@widget/*`
- `@library/*`
- `@utils/*`

Runtime и UI imports:

- `@sellgar/app` - renderer-neutral application/runtime/DI/router contracts.
- `@sellgar/app/react` - React declarations, hosts и hooks.
- `@library/route-tokens` - tokenized navigation contracts.
- `@sellgar/kit` - UI components.
- `@sellgar/kit/icons` - SVG icon components.

Не импортировать feature internals через deep relative paths между package boundaries. Нужную public surface экспортировать из `src/index.ts` target package.

## Локальные Импорты

При обращении к фасаду каталога указывать путь к каталогу, без `/index` и расширения: `../../../../infrastructure/http-client`. Это правило действует для импортов, реэкспортов и тестов. Файл `index.ts` остаётся реализацией фасада; прямые импорты внутренних файлов допустимы только внутри соответствующего владельца или там, где по архитектуре фасад не предусмотрен.

Внутри package порядок такой:

1. External packages.
2. Workspace packages.
3. Локальные absolute или relative modules.
4. Стили последними, если component их использует.

Пример:

```tsx
import { Button } from '@sellgar/kit';
import { BrandCreateRoute } from '@library/route-tokens';
import { useNavigate } from '@sellgar/app/react';
import { AddLineIcon } from '@sellgar/kit/icons';

import s from './header.module.scss';
```

## CSS-Модули

Для CSS module import использовать имя `s`:

```tsx
import s from './default.module.scss';
```

## Запрещенные patterns

- Obsolete module aliases из других projects.
- Строковые URL и прямой `react-router-dom` в application code.
- Старые package names UI-kit; текущий UI package - `@sellgar/kit`.
- Font icon classes для новой работы с иконками. Использовать SVG icon exports из `@sellgar/kit/icons`.
- Cross-package imports из private internals другого package: `src/view/...` или `src/classes/...`.
