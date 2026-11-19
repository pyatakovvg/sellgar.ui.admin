# Изменения категорий Store

- Публичный экспорт — CategoryChangesProvider. Подключён в @module/categories.
- Application provider подписывается через локальный Hub на store.category.created/updated.
- Hub валидирует CategoryEntity и использует /socket.io/categories, channel categories.
- После события provider читает актуальное дерево магазина и обновляет реактивный
  CategoryTreeEntity по shopUuid. Это сохраняет серверный порядок и перенос поддерева
  без локального дублирования алгоритма дерева. Другие магазины не изменяются.
- Фрейм сохранения не вызывает revalidate/updateEntity. Cleanup подписки исполняет framework.
