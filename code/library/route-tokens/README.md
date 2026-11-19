# `@library/route-tokens`

Пакет содержит стабильные типизированные идентификаторы маршрутов Sellgar
Admin и их параметры.

Токены не владеют URL, React-компонентами, loaders, layouts, policies или
router declarations. Связка токена с address и runtime-конфигурацией
принадлежит composition root в `clients/admin`.

Create и modify представлены разными токенами. Поэтому обязательные параметры
modify-маршрута проверяются TypeScript при построении navigation request.
