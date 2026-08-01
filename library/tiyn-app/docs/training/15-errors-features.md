# Занятие 15. Ошибки, Recovery И Application Features

- Статус документа: current
- Формат: 90 минут
- Уже известно: runtime operations, boundaries и session
- Новые понятия: failed/interrupted, runtime error bus, reporter, exception UI,
  notification, user request

## Результат Занятия

Локальные ошибки отображаются ближайшей boundary, Unauthorized запускает один
application-level recovery, успешная mutation показывает notification, а
опасное действие предваряется awaitable confirm.

---

## Слайд 1. Не Все Неуспехи Одинаковы

### На Экране

```text
completed   -> применить result
failed      -> обычный error flow
interrupted -> runtime revision уже изменилась
```

### Заметки Ведущего

Если request упал после `authenticated -> anonymous`, старый результат больше
не актуален. Это lifecycle interruption: stale data не записываются и exception
UI старого runtime не показывается.

---

## Слайд 2. Два Канала Ошибок

### На Экране

```text
RuntimeErrorsInterface
  реакция приложения на сам error

RuntimeErrorReporterInterface
  diagnostic: source, phase, code, severity
```

### Заметки Ведущего

Bus нужен для recovery/logging/dialog. Reporter нужен для framework diagnostics.
Они дополняют, а не заменяют друг друга.

---

## Слайд 3. Framework Публикует Runtime Errors

### На Экране

```text
initializer
route loader/action
widget load/action/revalidate
frame load/action/revalidate
```

```tsx
const runRuntimeOperation = useRuntimeOperation();
await runRuntimeOperation(() => gateway.save(payload));
```

### Заметки Ведущего

View operation оборачивается явно. Hook сначала emit-ит error в общий bus,
затем пробрасывает его, поэтому локальная форма всё ещё может показать ошибку.

---

## Слайд 4. Application-Level Recovery Через Initializer

### На Экране

```ts
execute(context): void {
  context.disposables.add(
    context.errors.on(UnauthorizedException, () => {
      context.session.setAnonymous();
    }),
  );
}
```

### Заметки Ведущего

Framework не знает бизнес-смысл 401. Domain/request layer бросает exception,
host application выбирает recovery. Для конкурентных 401 recovery нужно
deduplicate одной общей Promise.

---

## Слайд 5. Ближайшая Exception UI Boundary

### На Экране

```text
widget exception
frame exception
module exception
route exception
application exception
```

```tsx
const error = useException();
return <ErrorView error={error} />;
```

### Заметки Ведущего

Initial load/startup failure может заменить содержимое runtime boundary.
Submit/revalidate error обычно остаётся recoverable hook state. Interrupted не
попадает в exception UI.

---

## Слайд 6. Notification — Неблокирующая Feature

### На Экране

```tsx
const notification = useNotification();

notification.show({
  status: 'success',
  title: 'Заказ сохранён',
  autoClose: true,
});
```

### Заметки Ведущего

Host application сначала подключает `NotificationFeature` и concrete
presentation. View использует hook, controller может inject-ить
`NotificationServiceInterface`.

---

## Слайд 7. User Request — Awaitable Decision

### На Экране

```ts
const confirmed = await this.userRequest.confirm({
  title: 'Удалить заказ?',
  description: 'Действие нельзя отменить.',
  applyText: 'Удалить',
  cancelText: 'Отмена',
});

if (!confirmed) return;
```

### Заметки Ведущего

`alert`, `confirm`, `prompt` являются awaitable application feature. Concrete
presentation задаёт host. Отсутствие presentation — configuration error, а не
молчаливый cancel.

---

## Слайд 8. Composition Host Задаёт Presentation

### На Экране

```tsx
app.features([
  NotificationFeature.configure({
    presentation: NotificationPresentation.define((registry) => {
      registry.info(InfoNotificationView);
      registry.success(SuccessNotificationView);
      registry.destructive(ErrorNotificationView);
    }),
  }),
  UserRequestFeature.configure({
    presentation: UserRequestPresentation.define((registry) => {
      registry.alert(AlertView);
      registry.confirm(ConfirmView);
      registry.prompt(PromptView);
    }),
  }),
]);
```

### Заметки Ведущего

Framework feature владеет runtime contract, host — визуальной presentation,
business feature — содержанием конкретного запроса.

---

## Слайд 9. Составной Delete Flow

### На Экране

```text
confirm
-> service.delete
-> publish OrderDeletedEvent
-> close frame
-> success notification

failure
-> local submit state
-> runtime error bus
-> destructive notification по policy приложения
```

### Заметки Ведущего

Попросите аудиторию назвать owner каждого шага. Это репетиция финального
занятия.

---

## Слайд 10. Практика

1. Настроить notification и user-request presentations.
2. Добавить confirm перед delete action.
3. Показать success notification.
4. Бросить Unauthorized и выполнить application recovery.
5. Смоделировать смену session revision во время request и убедиться, что
   старый exception UI не показывается.
6. Подключить reporter sink без рекурсии через тот же failing request pipeline.

## Источники Ведущего

- [Runtime operations, errors и reporting](../08-policies-revalidate-errors.md)
- [Application initializers](../02-application.md#инициализаторы)
- `src/features/notification` и `src/features/user-request`
