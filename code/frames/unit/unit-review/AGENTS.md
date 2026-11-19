# AGENTS

`@frame/unit-review` владеет drawer просмотра размерности по `UnitReviewRoute`.

- Параметр `code` приходит через `args.params`; тип выводится из route token.
- Loader загружает размерность через `UnitServiceInterface.findByCode`.
- Просмотр не содержит формы и команд сохранения.
- Кнопка редактирования вызывает controller и переходит на `UnitModifyRoute`.
- Описание отображается отдельным многострочным блоком с разделителем; пустое значение — «Не указано».
