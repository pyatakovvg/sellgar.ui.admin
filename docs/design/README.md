# Проектная Документация

Design-документы описывают, как рассуждать о крупных изменениях до implementation.

Использовать их, когда задача меняет:

- route structure;
- boundaries между frame/page/widget;
- contracts shared libraries;
- domain data flow;
- long-running UX или backend-owned processes.

Для узких bug fixes сначала смотреть текущий code и держать изменение local.

Вся документация пишется на русском языке; paths, package names, commands и API identifiers оставляются как code literals.
