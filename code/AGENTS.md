# Исходный код админки

Корень Yarn workspaces — этот каталог. Команды `yarn install --immutable`,
`yarn dev:admin_ui`, `yarn build:admin_ui` и `yarn test` выполняются из `code/`.

Правила приложения: [../AGENTS.md](../AGENTS.md).
Документация репозитория: [../docs](../docs).
Пути пакетов `clients/*`, `library/*`, `modules/*` и остальных слоёв
в локальных инструкциях и архитектурных документах отсчитываются от `code/`.

Вложенные Git repositories находятся в `library/`; их исходники и ветки
не менять в рамках задач родительского приложения без соответствующего scope.
