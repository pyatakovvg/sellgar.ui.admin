# `@client/mobile`

Android React Native playground для стабилизации `@sellgar/app-v2/native`.
Приложение не зависит от существующего `mobile/sellgar.mobile` и использует
публичные entrypoints `@sellgar/app-v2` и `@sellgar/app-v2/native`.

## Сценарии

- тот же bootstrap flow, что у web: `Application -> compose -> createView -> initialize`;
- composition root в `src/application`, route graph в `src/application/routes`;
- route tokens из отдельного workspace-пакета `@library/route-tokens`;
- bootstrap единственного core `Application` lifecycle;
- native `Router`/`Route`/`Module` presentation;
- controller loader, action и observable processing state;
- намеренно замедленная подготовка Products/Brands для ручной проверки initial
  fallback и отличия от revalidation без скрытия текущих loader data;
- pull-to-refresh и повторная активация active tab выполняют module
  revalidation с сохранением controller instance и текущих loader data;
- query-controller изменяет только собственный `@Query()`-срез через action, а
  data-controller читает тот же query как общий фильтр;
- строгие Route params и переход через `useNavigate()`;
- две взаимоисключающие policy-ветки: anonymous и authenticated;
- основной native navigation host с route screens, режимом без tab bar для anonymous
  ветки и `MainTabsLayout` для authenticated ветки;
- `TabItem` поверх общего core navigation control;
- retained screen history для tab, link и imperative navigation;
- Stack flow для `Route.routes`: новый target/params показывает локальный
  fallback, Back восстанавливает подготовленный screen без loader;
- Drawer projection для `Route.routing`, включая локальный nested fallback,
  `navigate.close()` и восстановление Drawer через Back;
- отмена pending navigation аппаратным Back и двойной Back для выхода с root;
- восстановление сохранённой policy location после повторной аутентификации.

## Структура

```text
src/
  index.tsx
  bootstrap.tsx
  application/
    mobile.application.tsx
    components/
    initializers/
    policies/
    routes/
  layouts/
  pages/
  shared/
  shells/
  widgets/
```

`index.tsx` содержит только platform entrypoint. `bootstrap.tsx` создаёт
Application и передаёт ему bridge. Application конфигурирует components,
layouts, routing и root Router теми же методами, что web renderer.

## Запуск

Из корня `frontend/sellgar.ui.admin`:

```bash
yarn dev:mobile
yarn android:mobile
```

Для ручной установки уже собранного debug APK нужен проброс Metro-порта:

```bash
adb reverse tcp:8081 tcp:8081
```

## Текущая граница

Native facade повторяет имена и форму React facade; platform-specific различия
ограничены presentation types, native navigation controls и bridge. Native
screen stack, Drawer и tab bar являются только физической projection core
navigation state. `MainTabsLayout` владеет визуальным tab bar, а `TabItem`
отправляет обычный tokenized navigation request. Core хранит authoritative
history и `focused <-> retained` lifecycle; native host отображает этот snapshot
и не создаёт параллельную логическую state machine.
