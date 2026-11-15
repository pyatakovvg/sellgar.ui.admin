# Категории магазина

`@module/categories` владеет просмотром дерева категорий выбранного магазина.

- Источник данных — Store: `GET /v2/store/categories/tree?shopUuid=<uuid>`.
- Loader получает магазины и дерево; выбор магазина хранится в module query `shopUuid`.
- Контракт — `CategoryTreeEntity { shopUuid, nodes }`, каждый `CategoryNodeEntity`
  содержит обязательный массив `children`; лист возвращает `[]`.
- Таблица использует `@sellgar/kit/table`, внешний scroll и виртуализацию.
  Дерево передаётся через `tree.accessor: (row) => row.children`, изначально раскрыто.
- Кнопка `Cell.render.TreeTrigger` и отступ по `node.depth` находятся в ячейке имени.
  У листа сохраняется место кнопки для выравнивания соседей.
- Loader не подменяет ошибки API демонстрационными данными. Примеры заполняет
  явный seed Store; в module их нет.
- Создание открывает `CategoryCreateRoute` с shopUuid выбранного магазина; row click
  открывает `CategoryModifyRoute` с UUID категории. Кнопка раскрытия не открывает frame.
- Фрейм использует Store API; после сохранения дерево обновляется.
  Удаление, отдельная сортировка и привязка товаров пока не подключены.

Дерево CategoryTreeEntity реактивно по shopUuid. CategoryChangesProvider в providers
декларации модуля обновляет снимок по событиям store.category.created/updated.
Фрейм не управляет перезагрузкой таблицы.
