# AGENTS

`@frame/brand-review` владеет drawer просмотра бренда по `BrandReviewRoute`.

- Параметр `code` приходит через `args.params`; тип выводится из route token.
- Loader загружает бренд через `BrandServiceInterface.findByCode`.
- Просмотр не содержит формы и команд сохранения.
- Кнопка редактирования вызывает controller и переходит на `BrandModifyRoute`.
