# Фрейм категории магазина

`@frame/category-modify` владеет созданием и редактированием категории Store.

- Runtime — `@Module`, общий application Drawer; маршруты принадлежат host.
- `CategoryCreateRoute` получает `shopUuid` из params; `CategoryModifyRoute` — `uuid`.
  При редактировании магазин определяется самой категорией, не внешним query.
- Loader возвращает категорию (null для создания), магазин и дерево допустимых
  родителей. Сам узел и всё его поддерево исключаются.
- Родитель выбирается через NewSelect.Tree с selectBranches=true. Стрелка раскрывает
  ветку, название выбирает её; очистка размещает категорию в корне.
- Поля формы: name, description, parentUuid. Пустой parentUuid означает корень.
  Code и старый multipart/image-контракт не используются.
- Create/update используют Store API, commandId и expectedVersion для правки.
  Название, описание и смена родителя сохраняются одной транзакцией.
- После успешного сохранения controller закрывает drawer. Данные таблицы обновляет
  CategoryChangesProvider по socket delivery; фрейм не перезагружает loaders и не
  обновляет дерево вручную. Ошибка остаётся в форме.
- Форму и связывание react-hook-form держать во view, выбор операции и navigation —
  в controller, обход дерева родителей — в его чистом mapper.
