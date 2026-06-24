# Источники Истины

## Основной Источник

Текущий код является источником истины:

- routes: `clients/admin/src/application/admin.application.tsx`;
- host bindings: `clients/admin/src/application/bindings/admin.bindings.ts`;
- package exports: каждый package `src/index.ts`;
- package dependencies: каждый package `package.json`;
- UI contracts: installed types `@sellgar/kit` и локальные usage examples;
- runtime contracts: `library/tiyn-app/src` и `library/tiyn-app/docs`.

## Правило документации

Docs должны описывать этот repository, а не copied reference projects.

Перед добавлением или изменением docs сверять имена с actual paths. Не оставлять references на old hosts, old module aliases или unrelated domain routes.

Вся документация пишется на русском языке. Paths, package names, commands и API identifiers остаются как code literals.

## Рабочий Референс

Если есть known-good implementation в другом local project, его можно изучить как reference, но contract нужно переводить на реальные package names и routes этого repository. Project-specific examples не копировать вслепую.
