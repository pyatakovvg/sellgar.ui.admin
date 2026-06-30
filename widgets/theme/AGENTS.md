# AGENTS.md

Общие правила пакетов: [docs/agent/package-common.md](../../docs/agent/package-common.md).

## Назначение

`@widget/theme` - provider темы и view переключателя темы. Хранит настройку
темы, учитывает `prefers-color-scheme`, выставляет `data-theme` на `html` и даёт
UI переключения темы.

Пакет экспортирует React provider/view напрямую и не является декларацией
`@tiyn/app` widget.

## Границы

- Публичные экспорты: `WidgetProvider`, `WidgetView`.
- Публичные props `WidgetView`: `isOnlyIcon?: boolean`.
- Внутренние hooks/context не экспортировать без явной потребности внешних
  потребителей.
- Storage key/value для настройки темы считать задачей миграции.
- Общие settings/preferences, backend profile settings, design tokens, route
  policies и правила размещения в layout здесь не размещать.

## Проверка

- Изменение provider/storage/system theme: сборка и ручная проверка
  переключения темы.
- Изменение view: проверить потребителей в main/navigate layouts.
- Изменение DOM/theme-контракта: проверить `data-theme` и визуальный результат.
