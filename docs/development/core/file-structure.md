# Структура Файлов

## Корень

- `clients/admin` - Vite application host.
- `layouts/*` - layout workspaces.
- `pages/*` - route-level page workspaces.
- `frames/*` - drawer/modal frame workspaces.
- `widgets/*` - embedded widget workspaces.
- `library/*` - shared libraries.
- `utils/*` - utility packages.
- `docs/*` - project и agent documentation.

## Page-Пакет

Типовая структура:

```text
pages/<name>/
  package.json
  AGENTS.md
  src/
    index.ts
    module.tsx
    classes/
    view/
    hooks/
    requests/
```

Pages использовать для экранов, которые загружаются route.

## Frame-Пакет

Типовая структура:

```text
frames/<name>/
  package.json
  AGENTS.md
  src/
    index.ts
    <name>.frame.tsx
    shell.tsx
    classes/
    view/
    hooks/
    requests/
```

Frames использовать для drawer/modal workflows. Frame должен владеть controller, loader, form view, mutation hooks и shell.

## Widget-Пакет

Типовая структура:

```text
widgets/<name>/
  package.json
  AGENTS.md
  src/
    index.ts
    widget.tsx
    classes/
    view/
    hooks/
```

Widgets использовать только для reusable embedded UI. Не использовать widgets как drawer/modal feature containers.

## Library-Пакет

`library/*` packages должны экспортировать стабильную публичную surface из `src/index.ts`. Package boundaries должны быть явными; не импортировать private files другого package.
