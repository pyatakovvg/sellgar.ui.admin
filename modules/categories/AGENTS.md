# AGENTS

## Зона ответственности

`@module/categories` владеет route списка категорий.

## Правила

- Loader списка категорий, table и header держать здесь.
- Для create/edit actions открывать `CategoryModifyFrame`.
- Использовать `Table` из `@sellgar/kit/table` с внешней прокруткой, виртуализацией
  и встроенной идентификацией строк по объектам. Описание — auto, resize выключен.
- Дерево передаётся через `tree.accessor: (row) => row.children`; кнопка ветви — `Cell.render.TreeTrigger`,
  отступ имени берётся из `node.depth`. Раскрытие не открывает редактор категории.
- При изменении table cells сохранять отображение category hierarchy.
