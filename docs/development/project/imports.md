# Импорты

## Импорты Пакетов

Для cross-package imports использовать workspace package aliases:

- `@client/admin`
- `@layout/*`
- `@page/*`
- `@frame/*`
- `@widget/*`
- `@library/*`
- `@utils/*`

Runtime и UI imports:

- `@tiyn/app` - application, routing, modules, frames, DI hooks и policies.
- `@sellgar/kit` - UI components.
- `@sellgar/kit/icons` - SVG icon components.

Не импортировать feature internals через deep relative paths между package boundaries. Нужную public surface экспортировать из `src/index.ts` target package.

## Локальные Импорты

Внутри package порядок такой:

1. External packages.
2. Workspace packages.
3. Локальные absolute или relative modules.
4. Стили последними, если component их использует.

Пример:

```tsx
import { Button } from '@sellgar/kit';
import { useFrame } from '@tiyn/app';
import { AddLineIcon } from '@sellgar/kit/icons';

import { BrandModifyFrame } from '@frame/brand-modify';

import s from './header.module.scss';
```

## CSS-Модули

Для CSS module import использовать имя `s`:

```tsx
import s from './default.module.scss';
```

## Запрещенные patterns

- Obsolete module aliases из других projects.
- Старые package names UI-kit; текущий UI package - `@sellgar/kit`.
- Font icon classes для новой работы с иконками. Использовать SVG icon exports из `@sellgar/kit/icons`.
- Cross-package imports из private internals другого package: `src/view/...` или `src/classes/...`.
