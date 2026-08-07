# Socket.IO Transport

## Назначение

`@library/socket-io` предоставляет конфигурируемое разделяемое соединение с одним
Socket.IO endpoint. Физическое соединение существует, пока есть хотя бы одна
активная подписка.

## Границы

- Публичная точка входа: `src/index.ts`.
- Пакет не знает про domain entities, React и feature packages.
- Один `SocketIOConnection` соответствует одному Socket.IO endpoint/namespace.
- Первый вызов `get()` для endpoint определяет transport options разделяемого соединения.
- Для одного event регистрируется один transport dispatcher. Каждая подписка
  создаёт отдельный lease и получает отдельную доставку, включая одинаковый handler.
- `subscribe()` регистрирует обработчик до запуска соединения.
- Первая подписка запускает соединение, освобождение последней останавливает его.
- Socket.IO Manager выполняет штатный reconnect. Пакет повторно вызывает `connect()`
  только когда автоматический reconnect не активен, но спрос ещё существует.
- URL, namespace, event names, auth payload и transport DTO принадлежат concrete
  adapter-у приложения, а не этому пакету.

## Проверка

- Запустить тесты `library/socket-io/src`.
- При изменении public API запустить typecheck/build потребителей.
