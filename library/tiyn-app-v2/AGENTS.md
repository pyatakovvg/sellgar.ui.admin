# AGENTS.md

Общие правила пакетов:
[docs/agent/package-common.md](../../docs/agent/package-common.md).

## Структура

- Общего каталога `src` нет.
- `core`, `react`, `native` и `fsm` — entrypoint-части одного package.
- Public imports определяются только `package.json#exports`; deep imports
  запрещены.
- Внутри entrypoint код сначала группируется по framework-домену (`router`,
  `application`, `module`), затем по роли (`declaration`, `runtime`, `service`),
  затем по конкретному owner. Implementation-файлы непосредственно в корне
  entrypoint запрещены.
- Каждый конкретный owner имеет локальный facade-файл; public entrypoint явно
  выбирает из owner facades только публичный контракт.
- Самостоятельный owner импортируется через его каталог. Путь к локальному
  `index.ts`/`index.tsx` никогда не указывается напрямую; конкретный
  implementation-файл разрешено импортировать только изнутри того же owner.
- Внутренняя структура создаётся вместе с реализацией, а не заранее.
- Общий каталог тестов не используется; тест принадлежит конкретному owner.

## Границы

- Существующий `@sellgar/app` является behavioral и implementation reference для
  механик, конфигурации и framework entities. V2 разделяет его на core,
  renderer adapters и bridges, а не проектирует новый движок.
- Реализация переносится законченными срезами. Если RFC явно не фиксирует
  semantic delta, сохраняются публичный контракт, порядок lifecycle, ownership,
  error handling и cleanup исходного среза.
- Core не импортирует React, React DOM, React Router или React Native.
- Renderer adapter использует один core lifecycle и не создаёт второй runtime.
- Router bridge реализует core navigation ports и не владеет logical navigation
  state.
- Renderer-specific declarations, hosts, hooks и presentation types не попадают
  в core source и core `.d.ts`.
- `@sellgar/app-v2` не импортирует private implementation `@sellgar/app`: код
  переносится в новый package, чтобы staging не зависел от старого runtime.

## Проверка

- `yarn workspaces list --json` показывает `@sellgar/app-v2`;
- TypeScript разрешает все объявленные entrypoints;
- Prettier и `git diff --check` проходят;
- Admin UI собирается и проходит active test suite на `@sellgar/app-v2`.
