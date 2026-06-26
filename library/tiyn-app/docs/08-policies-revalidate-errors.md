# Policies, Revalidate И Ошибки

Этот раздел описывает три разных механизма:

- policies управляют доступом к route boundary;
- revalidate обновляет active data;
- runtime operation flow отделяет lifecycle interruption от exception;
- runtime errors публикуют ошибки runtime/view operations для host-обработчиков;
- runtime reporter фиксирует ошибки runtime-слоя.

## Policies

Policies защищают route boundaries.

Доступные slots:

```ts
new Route({
  canMatch: [RequireAuthenticatedSessionPolicy],
  canActivate: [CanViewOrdersPolicy],
  canAction: [CanEditOrdersPolicy],
  load: () => import('@module/orders'),
});
```

Смысл slots:

```text
canMatch
  можно ли матчить route и загружать module

canActivate
  можно ли активировать route/module

canAction
  можно ли выполнить action на route/module
```

Policy contract:

```ts
@Policy()
export class RequireAuthenticatedSessionPolicy extends PolicyInterface {
  constructor(
    @Inject(SessionRuntimeStateInterface)
    private readonly session: SessionRuntimeStateInterface,
  ) {
    super();
  }

  execute(): PolicyResult {
    if (this.session.phase === 'authenticated') {
      return { type: 'pass' };
    }

    return {
      reason: 'Session is not authenticated.',
      type: 'fail',
    };
  }
}
```

Policy result:

```ts
{ type: 'pass' }
{ type: 'fail', reason?: string, data?: unknown }
```

## Boundary Decisions

`Router` предоставляет helpers для policy result handling:

```ts
Router.continue();
Router.redirectTo('/sign-in');
Router.redirectTo('/sign-in', {
  replace: true,
  saveCurrentLocation: true,
});
Router.redirectToSaved({
  fallback: '/',
  replace: true,
});
Router.forbidden();
Router.notFound();
Router.error(error);
```

Configured policy:

```ts
new Route({
  canMatch: [
    RequireAuthenticatedSessionPolicy.configure().onFail(
      Router.redirectTo('/sign-in', {
        replace: true,
        saveCurrentLocation: true,
      }),
    ),
  ],
  load: () => import('@module/orders'),
});
```

Builder поддерживает:

```ts
Policy.configure().withOptions(options);
Policy.configure().onPass(handler);
Policy.configure().onFail(handler);
Policy.configure().onError(handler);
```

Handler может быть прямым `PolicyBoundaryDecision` или DI token, реализующим
`PolicyResultHandlerInterface`.

## Runtime Operation Flow

Route, frame и widget runtime выполняют loader/action/revalidate как runtime
operation. Operation возвращает внутренний результат:

```text
completed
  операция завершилась успешно

failed
  операция упала, lifecycle не изменился

interrupted
  операция упала после смены runtime revision
```

Runtime revision сейчас даёт `SessionRuntimeStateInterface.revision`.

Если operation бросила ошибку после перехода session state, например
`authenticated -> anonymous`, это не считается exception для текущего
module/frame/widget. Это lifecycle interruption: старый поток больше не
является актуальным, а дальнейшее поведение должен определить route/session
flow.

Правила:

```text
completed
  применить result

failed
  оставить обычное error behavior: state failed, reporter, exception UI или
  submit error state в зависимости от runtime boundary

interrupted
  не показывать exception UI для старого runtime flow
  не записывать stale loader data
  не переводить widget/frame в failed из-за ожидаемого session transition
```

Route runtime при `interrupted` повторно применяет policies к текущему session
state. Protected branch может редиректить на sign-in через обычный
`Router.redirectTo(...)` policy handler.

Frame и widget runtime при `interrupted` сохраняют корректное локальное
состояние:

```text
load interrupted
  runtime возвращается в idle/неактивное состояние

revalidate interrupted
  текущие ready data остаются прежними

action interrupted
  action завершается без result и без exception UI
```

Этот механизм является internal framework contract. Feature-код не должен
создавать `RuntimeOperationResult` вручную и не должен ловить 401 в module,
widget или frame ради управления navigation.

## Runtime Errors

`RuntimeErrorsInterface` - application-level bus для ошибок, которые возникли в
runtime operations или в view operations, явно обёрнутых через runtime hook.

Контракт:

```ts
export abstract class RuntimeErrorsInterface {
  abstract emit(error: unknown): Promise<void>;
  abstract on<TError>(errorType: DependencyConstructor<TError>, handler: RuntimeErrorHandler<TError>): () => void;
  abstract on<TError>(predicate: RuntimeErrorPredicate<TError>, handler: RuntimeErrorHandler<TError>): () => void;
  abstract subscribe(handler: RuntimeErrorHandler): () => void;
}
```

Framework emit-ит ошибки из:

- application initializers;
- route loader/action operations;
- frame load/action/revalidate operations;
- widget load/action/revalidate operations.

Для view-слоя есть hooks:

```tsx
const runRuntimeOperation = useRuntimeOperation();

await runRuntimeOperation(async () => {
  await userGateway.save(payload);
});
```

Если operation бросит ошибку, hook сначала отправит её в
`RuntimeErrorsInterface`, затем пробросит дальше. View всё ещё может показать
локальную ошибку формы, но application-level обработчики тоже получат событие.

Подписка в application initializer:

```ts
@Initializer()
export class RegisterRuntimeLoggingInitializer implements ApplicationInitializerInterface {
  execute(context: ApplicationInitializerContextInterface): void {
    context.disposables.add(
      context.errors.subscribe((error) => {
        logger.error(error);
      }),
    );
  }
}
```

Подписка может быть по class exception или predicate:

```ts
context.errors.on(UnauthorizedException, async () => {
  context.session.setAnonymous();
});

context.errors.on(isValidationException, (error) => {
  reportValidation(error);
});
```

`RuntimeErrorsInterface` не заменяет `RuntimeErrorReporterInterface`.

```text
RuntimeErrorsInterface
  application-level реакция на саму ошибку: session recovery, dialog, logging,
  sentry bridge, analytics

RuntimeErrorReporterInterface
  framework diagnostics: где упал runtime, какой code/severity, какой lifecycle
  phase
```

Domain/request layer должен бросать нормальные exceptions и не выполнять
application recovery сам. Framework публикует ошибку, host решает реакцию.

## Unauthorized Recovery

`401 Unauthorized` является доменной ошибкой request pipeline. Framework не
знает бизнес-смысл 401 и не содержит auth-specific recovery.

Application composition root подключает recovery через initializer:

```ts
@Initializer()
export class RegisterUnauthorizedRecoveryInitializer implements ApplicationInitializerInterface {
  private recoveryInProgress: Promise<void> | null = null;

  constructor(
    @Inject(RuntimeErrorsInterface)
    private readonly runtimeErrors: RuntimeErrorsInterface,
    @Inject(SessionRuntimeStateInterface)
    private readonly session: SessionRuntimeStateInterface,
    @Inject(UserRequestServiceInterface)
    private readonly userRequestService: UserRequestServiceInterface,
  ) {}

  execute(context: ApplicationInitializerContextInterface): void {
    context.disposables.add(
      this.runtimeErrors.on(UnauthorizedException, async () => {
        if (!this.recoveryInProgress) {
          this.recoveryInProgress = this.recover().finally(() => {
            this.recoveryInProgress = null;
          });
        }

        await this.recoveryInProgress;
      }),
    );
  }

  private async recover(): Promise<void> {
    if (this.session.phase === 'authenticated') {
      await this.userRequestService.alert({
        title: 'Сессия завершена',
        description: 'Срок действия авторизации истёк. Выполните вход снова.',
        applyText: 'Ок',
      });
    }

    this.session.setAnonymous();
  }
}
```

Сохранение и восстановление текущего URL также принадлежит route policy
handlers:

```ts
RequireAuthenticatedSessionPolicy.configure().onFail(
  Router.redirectTo('/sign-in', {
    replace: true,
    saveCurrentLocation: true,
  }),
);

RequireAnonymousSessionPolicy.configure().onFail(
  Router.redirectToSaved({
    fallback: '/',
    replace: true,
  }),
);
```

Sign-in module не должен самостоятельно читать сохранённый URL и выполнять
дополнительный redirect после `session.setAuthenticated()`. Возврат на
сохранённый URL выполняется policy flow.

## Revalidate Runtime Entity

Revalidate - framework-level request на обновление active loader data ближайшей
runtime entity: module, frame или widget.

Используй revalidate, когда нужно обновить данные, загруженные controller
loader-ом текущей runtime entity.

Во view:

```tsx
export const OrdersView: React.FC = () => {
  const revalidate = useRevalidate();

  return (
    <button type="button" onClick={() => revalidate(OrdersController)}>
      Перезагрузить
    </button>
  );
};
```

В controller/service/provider:

```ts
@Provider()
export class RefreshOrdersProvider extends RuntimeProviderInterface {
  constructor(
    @Inject(RevalidateServiceInterface)
    private readonly revalidateService: RevalidateServiceInterface,
  ) {
    super();
  }

  async afterRender(): Promise<void> {
    await this.revalidateService.revalidate(OrdersController);
  }
}
```

Global revalidate:

```ts
await revalidateService.revalidate();
```

Targeted revalidate:

```ts
await revalidateService.revalidate(OrdersController);
```

Для module runtime внешний router adapter может перезапустить active route
loader. Feature code не должен зависеть от controller-level partial reload.

Владелец revalidate должен быть один. Если action controller сам вызывает
`RevalidateServiceInterface`, view не должен повторно вызывать
`useRevalidate()` для того же сценария без отдельной причины.

## Revalidate Widget

Widget controller получает тот же `RevalidateServiceInterface`, но binding
берётся из widget scope и обновляет widget-local loader data.

Во widget view:

```tsx
const revalidate = useRevalidate();

await revalidate();
```

В widget controller:

```ts
@Controller()
export class OrdersSummaryWidgetController extends OrdersSummaryWidgetControllerInterface {
  constructor(
    @Inject(RevalidateServiceInterface)
    private readonly revalidateService: RevalidateServiceInterface,
  ) {
    super();
  }

  async action(args: WidgetControllerActionArgs<OrdersSummaryWidgetProps, { readonly reason: string }>): Promise<void> {
    await this.revalidateService.revalidate({
      signal: args.signal,
    });
  }
}
```

## Revalidate Frame

Frame controller получает тот же `RevalidateServiceInterface`, но binding
берётся из frame scope и обновляет frame-local loader data.

Во frame view:

```tsx
const revalidate = useRevalidate();

await revalidate();
```

В frame controller:

```ts
@Controller()
export class OrderDetailsController extends OrderDetailsControllerInterface {
  constructor(
    @Inject(RevalidateServiceInterface)
    private readonly revalidateService: RevalidateServiceInterface,
  ) {
    super();
  }

  async action(args: FrameControllerActionArgs<OrderDetailsFrameParams, { readonly reason: string }>): Promise<void> {
    await updateOrder(args.props.id, args.payload.reason);
    await this.revalidateService.revalidate({
      signal: args.signal,
    });
  }
}
```

## Runtime Reporting

Runtime reporter принимает typed reports:

```ts
export abstract class RuntimeErrorReporterInterface {
  abstract report(report: RuntimeErrorReport): void | Promise<void>;
}
```

Report shape:

```ts
interface RuntimeErrorReport {
  readonly code: RuntimeErrorCode;
  readonly error: unknown;
  readonly severity?: RuntimeErrorSeverity;
}
```

Реализованные runtime codes:

```text
application.disposable.dispose_failed
application.event.handler_failed
application.initializer.failed
frame.provider_before_render_failed
frame.provider_dispose_failed
revalidate.handler.failed
route.module.commit_cleanup_failed
route.module.discard_cleanup_failed
route.module.dispose_failed
route.module.provider_before_load_failed
route.module.provider_before_render_failed
route.module.provider_dispose_failed
```

Framework нормализует `code` в `source`, `phase` и `severity`.

`interrupted` runtime operation не является reportable exception. Если
operation прервана из-за смены session revision, это expected lifecycle flow,
а не ошибка provider/controller/module.

## Reporter Sink

Стандартный reporter pipeline можно заменить через DI bindings:

```ts
export class AppRuntimeErrorBindings extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(RuntimeErrorReporterSinkInterface).to(AppRuntimeErrorSink).inSingletonScope();
  }
}
```

Reporter sink не должен ломать application flow. Если sink отправляет ошибки на
server endpoint, он не должен создавать recursion через тот же request pipeline.

## Exception UI

Exception UI уровня application настраивается через `app.components(...)`.

Route exception UI:

```ts
new Route({
  path: '/orders',
  exception: <OrdersExceptionView />,
  load: () => import('@module/orders'),
});
```

Route-level 404 UI:

```ts
new Route({
  path: '/orders',
  notFound: <OrdersNotFoundView />,
  load: () => import('@module/orders'),
});
```

Route-level 403 UI:

```ts
new Route({
  path: '/orders',
  forbidden: <OrdersForbiddenView />,
  load: () => import('@module/orders'),
});
```

`forbidden` и `notFound` наследуются вниз по route tree. Ближайший route-level
status UI переопределяет application-level status UI.

Module exception UI:

```tsx
@Module({
  exception: <OrdersExceptionView />,
  view: OrdersView,
})
export class OrdersModule {}
```

Exception component читает ошибку через `useException()`:

```tsx
export const OrdersExceptionView: React.FC = () => {
  const error = useException();

  return <pre>{String(error)}</pre>;
};
```

Frame runtime errors во время provider/controller startup показываются через
`@Frame.exception`. Если у frame нет собственного `exception`, используется ближайший
route/application exception UI. Exception component получает ошибку через
`useException()`.

Ошибки, классифицированные runtime operation flow как `interrupted`, не
попадают в exception UI.
