# OOP-Контракт Runtime

Runtime приложения - `@sellgar/app`.

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

## Frame

Drawer/modal workflows объявляются через `@Frame`.

```tsx
@UseBindings(BrandModifyBindings)
@Frame<BrandModifyFrameParams>({
  shell: BrandModifyFrameShell,
  source: HashFrameSource.create<BrandModifyFrameParams>('brand'),
  view: FrameView,
})
export class BrandModifyFrame extends FrameDefinition<BrandModifyFrameParams> {}
```

Открывать frames из page UI через `useFrame(BrandModifyFrame)`.

Для hash frames loader arguments передают open props в `args.props`. Edit loaders должны читать identifiers сущностей из `args.props.uuid`, если frame implementation явно не документирует другой source.

## Bindings

Каждый page/frame/widget владеет своим local bindings module. Регистрировать только interfaces, которые нужны этому package.

Host bindings в `clients/admin` предназначены для application-wide services и domain infrastructure.

## Forms

Forms должны инициализироваться из loader data при создании формы. Effect-based `reset` не должен быть default fix для пустых значений; сначала проверить, что controller возвращает data через правильный runtime source.
