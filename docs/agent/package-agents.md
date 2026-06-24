# AGENTS Для Пакетов

Файл `AGENTS.md` должен быть в каждом workspace-пакете рядом с `package.json`.

Групповые файлы тоже существуют и задают правила для области:

- `clients/admin/AGENTS.md` - правила composition root.
- `layouts/AGENTS.md` - общие правила layouts.
- `layouts/*/AGENTS.md` - правила конкретного layout package.
- `pages/AGENTS.md` - общие правила pages.
- `pages/*/AGENTS.md` - правила конкретного page package.
- `frames/AGENTS.md` - общие правила frames.
- `frames/*/AGENTS.md` - правила конкретного frame package.
- `widgets/AGENTS.md` - общие правила widgets.
- `widgets/*/AGENTS.md` - правила конкретного widget package.
- `library/AGENTS.md` - общие boundaries shared libraries.
- `library/*/AGENTS.md` - правила конкретного library package.
- `utils/AGENTS.md` - общие boundaries utilities.
- `utils/*/AGENTS.md` - правила конкретного utility package.
- `docs/AGENTS.md` - правила документации.

Пакетные AGENTS должны быть короткими и добавлять только правила, которые конкретнее корневого `AGENTS.md`.
