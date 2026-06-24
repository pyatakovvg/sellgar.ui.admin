# Завершение Задачи

Перед завершением задачи:

- указать, какой package владеет изменением;
- назвать ключевые измененные файлы;
- выполнить самую узкую полезную проверку;
- для docs-only work проверить старые project names и aliases из source project через `rg`;
- если проверка не запускалась, сказать почему.

Предпочтительная проверка для runtime/UI changes:

```bash
yarn build:admin_ui
```

Для documentation changes использовать task-specific `rg` query по copied host names, old aliases и unrelated domain routes.
