# Проектные Проверки

Перед implementation крупного изменения ответить на вопросы:

- Какой package владеет behavior?
- Это route screen, frame, widget, layout или shared library change?
- Есть ли existing package с правильным pattern?
- Нужно ли route registration в `AdminApplication`?
- Нужен ли новый public export?
- Получает ли form data из правильного controller loader?
- Использует ли UI `@sellgar/kit` и SVG icons из `@sellgar/kit/icons`?
- Какая самая узкая verification command или browser path?

Документация по результату должна быть на русском языке.
