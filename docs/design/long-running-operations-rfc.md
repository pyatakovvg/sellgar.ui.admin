# RFC Long-Running Operations

В текущей admin UI нет принятого runtime для long-running operations.

Текущие mutation flows являются page/frame-local и с точки зрения UI завершаются синхронно:

- list pages загружают data через page controllers;
- drawer/modal forms загружают edit data через frame controllers;
- create/update requests вызывают owning controller;
- после success view закрывает frame или выполняет navigation/revalidate по local behavior.

Не вводить polling, operation registries или global operation UI без backend contract и отдельного design pass.

Если future feature потребует long-running operations, сначала определить:

- backend operation identity и lifecycle;
- polling или push transport;
- где progress отображается в shell;
- как route/frame refresh взаимодействует с completed operations;
- error и retry semantics.

Документация RFC должна быть на русском языке.
