# Общие Правила Пакетов

Эти правила применяются к каждому workspace package.

- Публичные exports держать в `src/index.ts`.
- Не импортировать private `src/view` или `src/classes` files другого package.
- DI bindings держать рядом с package, который владеет controller/service.
- Предпочитать текущие локальные patterns новой структуре.
- Для UI использовать `@sellgar/kit`.
- SVG-иконки брать из `@sellgar/kit/icons`.
- CSS modules импортировать как `s`.
- Держать изменения в scope запрошенного behavior.
- Документацию писать на русском языке.
