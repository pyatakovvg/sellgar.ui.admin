# OOP-Контракт Runtime

Runtime приложения - `@sellgar/app`; React API импортируется из `@sellgar/app/react`.

## Application

`AdminApplication` наследуется от `Application` и конфигурирует:

- global components: splash, fallback, exception, failed и not-found views;
- layouts;
- initializers;
- router;
- host bindings через `@UseBindings(AdminBindings)`.

Не помещать feature workflows в `AdminApplication`. Там нужно регистрировать packages, а implementation держать внутри package.

## Module

Route pages объявляются через `@Module`.

```tsx
@UseBindings(ProductsBindings)
@Module({
  view: ModuleView,
})
export class ProductsModule {}
```

Controller loader results читаются во view через `useLoaderData(ControllerInterface)`.

## Frame и nested routing

Drawer workflows остаются пакетами `frames/*`, но объявляются через единый
`@Module`; address/token/shell задаются host route graph.

```tsx
@UseBindings(BrandModifyBindings)
@Module({
  view: FrameView,
})
export class BrandModifyFrame {}
```

Открывать frame route через `useNavigate().to(BrandCreateRoute)` или `NavigateServiceInterface.to(Token, { params })`.

Loader/action получают tokenized identifiers в `args.params`. Тип params выводить через `RouteParams<typeof RouteToken>`; create route может использовать `Partial<...>`.

Один application-level `Drawer` shell обслуживает все nested frame routers. Frame packages не создают собственные shell и Modal shell.

## Bindings

Каждый page/frame/widget владеет своим local bindings module. Регистрировать только interfaces, которые нужны этому package.

Host bindings в `clients/admin` предназначены для application-wide services и domain infrastructure.

## Forms

Forms должны инициализироваться из loader data при создании формы. Effect-based `reset` не должен быть default fix для пустых значений; сначала проверить, что controller возвращает data через правильный runtime source.
