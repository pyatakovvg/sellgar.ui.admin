# Application features

- `features/*` — самостоятельные application features с именами пакетов `@feature/*`.
- Подключение выполняется через `app.features([...])` из `@sellgar/app/react`.
- Фича владеет своим lifecycle, DI bindings, controllers, services, stores и presentation.
- Публичный фасад — `src/index.ts`; внутренние `classes/` не экспортировать.
- Runtime-логику и внутренний presentation layer не размещать в host-приложении.
- Внешние компоненты представления принадлежат host-приложению, используют публичный контракт props фичи и подключаются через `configure`.
- У каждой подписки, таймера и ожидания должен быть cleanup при завершении приложения.
- Конфигурация сборщика остаётся в приложении, если отдельно не согласован preset.
- `@feature/service-worker/vite` — согласованный preset Service Worker. Держать его
  отдельно от runtime-фасада; он не должен импортировать React, DI и presentation.
