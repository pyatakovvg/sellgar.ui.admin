# AGENTS

`@frame/property-review` владеет drawer просмотра свойства по `PropertyReviewRoute`.

- `code` приходит через `args.params`; loader использует `PropertyServiceInterface.findByCode`.
- Просмотр содержит сведения о свойстве, код размерности, отдельное многострочное описание и опции с визуальными данными.
- Кнопка редактирования переходит по `PropertyModifyRoute`.
- Форма и команды сохранения принадлежат соседнему `@frame/property-modify`.
