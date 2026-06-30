# AGENTS.md

Общие правила пакетов: [docs/agent/package-common.md](../../docs/agent/package-common.md).

## Назначение

`@layout/main` - root visual wrapper приложения. Он подключает
`ThemeWidgetProvider` и задаёт общий wrapper для всего app UI.

Это root shell, а не navigation/auth/feature layout.

## Когда Открывать

Открывать при изменениях root wrapper, placement `children`, подключения
application-wide provider или взаимодействия с `@widget/theme`.

## Границы

- Публичная точка входа: `src/index.ts`.
- Публичный экспорт: `MainLayout`.
- Provider добавлять сюда только если он нужен всем branches.
- Navigation/sidebar, auth shell, section tabs/header, data loading, DI bindings
  и frame/widget поведение здесь не размещать.

## Проверка

- Изменение Root wrapper/provider: build и smoke app startup.
- Изменение Theme provider: проверить переключение темы.
