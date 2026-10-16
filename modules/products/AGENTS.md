# AGENTS

## Зона ответственности

`@module/products` владеет route списка товаров.

## Правила

- Loader списка товаров, table и header держать здесь.
- Для edit переходить на `/products/:uuid`, для create - на `/products/create`.
- Использовать текущий `Table` из `@sellgar/kit`.
- Row click является primary open/edit action для product rows.
- Page.Filter повторяет механику магазинов: SearchController читает/изменяет
  `term` через RouteQueryServiceInterface, ProductController.loader передает
  этот параметр в ProductService.findAll. Поиск выполняется на сервере;
  введенный запрос восстанавливается из URL, сброс очищает term.
