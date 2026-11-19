# AGENTS Для Пакетов

Файл `AGENTS.md` должен быть в каждом workspace-пакете рядом с `package.json`.

Групповые файлы тоже существуют и задают правила для области:

- `code/clients/admin/AGENTS.md` - правила composition root.
- `code/layouts/AGENTS.md` - общие правила layouts.
- `code/layouts/*/AGENTS.md` - правила конкретного layout package.
- `code/modules/AGENTS.md` - общие правила modules.
- `code/modules/*/AGENTS.md` - правила конкретного module package.
- `code/frames/AGENTS.md` - общие правила frames.
- `code/frames/*/AGENTS.md` - правила конкретного frame package.
- `code/widgets/AGENTS.md` - общие правила widgets.
- `code/widgets/*/AGENTS.md` - правила конкретного widget package.
- `code/library/AGENTS.md` - общие boundaries shared libraries.
- `code/library/*/AGENTS.md` - правила конкретного library package.
- `code/utils/AGENTS.md` - общие boundaries utilities.
- `code/utils/*/AGENTS.md` - правила конкретного utility package.
- `docs/AGENTS.md` - правила документации.

Пакетные AGENTS должны быть короткими и добавлять только правила, которые конкретнее корневого `AGENTS.md`.
