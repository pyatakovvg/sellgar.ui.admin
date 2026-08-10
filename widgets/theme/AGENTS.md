# AGENTS.md

Общие правила пакетов: [docs/agent/package-common.md](../../docs/agent/package-common.md).

## Назначение

`@widget/theme` — runtime Widget переключения темы. Хранит настройку темы,
учитывает `prefers-color-scheme`, выставляет `data-theme` на `html` и даёт UI
переключения темы.

## Границы

- Публичный экспорт: `ThemeWidget`.
- Widget props содержат `isOnlyIcon?: boolean` и выводятся потребителем из
  `WidgetDefinition`; отдельно их не экспортировать.
- Не создавать `widget.provider.tsx` и приватный React Context. Lifecycle темы
  реализовывать runtime provider из `src/providers/`.
- Preference меняется через controller action, а widget-owned состояние хранится
  в локальном store.
- Storage key/value для настройки темы считать задачей миграции.
- Общие settings/preferences, backend profile settings, design tokens, route
  policies и правила размещения в layout здесь не размещать.

## Проверка

- Изменение runtime provider/storage/system theme: сборка и ручная проверка
  переключения темы.
- Изменение view: проверить потребителей в navigate layout.
- Изменение DOM/theme-контракта: проверить `data-theme` и визуальный результат.
