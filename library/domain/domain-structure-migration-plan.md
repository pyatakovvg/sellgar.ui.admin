# Domain Structure Migration Plan

Статус: draft, без автоматического применения.

Назначение: описать целевую структуру `library/domain` и пошаговую миграцию
пакета к более чистой ООП/Clean Architecture модели без одномоментной ломки
публичного API.

Этот документ не разрешает вносить изменения сам по себе. Миграция начинается
только по отдельной команде.

## Контекст

Текущий пакет `library/domain` фактически совмещает несколько ролей:

- доменные сущности и типы;
- application services;
- gateway ports;
- concrete gateway implementations;
- HTTP/request/config/storage/signalr helpers;
- DTO и validation модели;
- root public API для приложения-хоста.

Основная публичная точка входа пакета сейчас:

```text
library/domain/src/index.ts
```

Приложение-хост собирает DI-контейнер вручную в:

```text
clients/management-panel/src/application/bindings/management-panel.bindings.ts
```

Из-за ручного биндинга root export вынужден открывать concrete classes:

```ts
registry.bind(TerminalGatewayInterface).to(TerminalGateway);
registry.bind(TerminalServiceInterface).to(TerminalService);
registry.bind(RequestExecutorInterface).to(RequestExecutor);
```

Это не делает реализации частью доменной модели, но делает их частью текущего
composition API пакета.

## Цель

Сделать структуру пакета понятной и устойчивой:

- доменная модель не знает про HTTP, DTO, DI, storage, signalr;
- application слой не зависит от gateway DTO;
- gateway реализация может лежать внутри пакета рядом с портом, но не должна
  случайно становиться публичной моделью;
- root `src/index.ts` является осознанным фасадом, а не зеркалом файловой
  системы;
- внешнее приложение не биндингует каждую внутреннюю реализацию вручную, если
  пакет может зарегистрировать свои реализации сам;
- миграция идёт постепенно, без массового переезда всех сущностей за один шаг.

## Архитектурные Правила

### 1. Слои

Для каждого доменного среза используется простая структура:

```text
classes/<slice>/
  domain/
    <slice>.entity.ts
    <slice>.types.ts
    <slice>.constants.ts

  application/
    <slice>-service.interface.ts
    <slice>.service.ts
    <slice>.inputs.ts

  gateway/
    <slice>-gateway.interface.ts
    <slice>.gateway.ts
    dto/
      *.dto.ts
    <slice>.mapper.ts

  index.ts
```

Не каждый срез обязан иметь все файлы. Файлы создаются только при реальной
необходимости.

### 2. Domain

`domain/` содержит предметную модель:

- entities;
- value types;
- доменные constants;
- доменные ошибки, если они выражают бизнес-правило.

`domain/` не импортирует:

- `application`;
- `gateway`;
- `helpers`;
- DTO;
- `class-validator`;
- `class-transformer`;
- HTTP/request/config/storage/signalr.

### 3. Application

`application/` содержит сценарный слой:

- service interfaces;
- service implementations;
- input types для use-case;
- orchestration поверх ports.

Service interface не должен принимать gateway DTO.

Плохо:

```ts
abstract create(dto: CreateEmployeeDto): Promise<EmployeeEntity>;
```

Правильно:

```ts
abstract create(input: CreateEmployeeInput): Promise<EmployeeEntity>;
```

Если input полностью совпадает с HTTP DTO сегодня, это всё равно разные роли.
DTO принадлежит gateway adapter, input принадлежит application boundary.

### 4. Gateway

`gateway/` содержит порт и реализацию рядом, потому что в текущем проекте
реализации не вынесены в отдельный infrastructure package.

Здесь допустимы:

- `GatewayInterface`;
- concrete `Gateway`;
- HTTP DTO;
- mappers;
- `HttpRequest`;
- `RequestExecutorInterface`;
- `ConfigInterface`;
- `plainToInstance`;
- `validateOrReject`;
- backend URL/path details.

DTO и mappers не экспортируются наружу как публичная модель пакета.

### 5. Helpers

Helpers нужны пакету и приложению-хосту, но делятся на две группы.

Public helper API:

- нужно для DI binding;
- нужно внешнему коду для обработки ошибок;
- является стабильным port/interface.

Internal helper mechanics:

- нужно только implementation внутри `library/domain`;
- не должно попадать в root.

Пример public helper API:

```ts
Config;
ConfigInterface;
RequestExecutor;
RequestExecutorInterface;
HttpException;
UnauthorizedException;
BadRequestException;
ConflictException;
LockoutException;
```

Пример internal helper mechanics:

```ts
HttpRequest;
HttpRequestConfig;
HttpErrorBus;
HttpErrorBusInterface;
HttpErrorEvent;
HttpErrorListener;
RequestExecutionContext;
RequestExecutionOptions;
RequestMode;
RequestOperation;
```

Если `StorageService` или `SignalRService` начнёт биндинговаться снаружи, он
становится public helper API. До этого он не должен попадать в root только
потому, что лежит в `helpers`.

## Public API Rules

### Root `src/index.ts`

Root export отвечает на вопрос:

> Что нужно внешнему приложению, чтобы использовать пакет?

Root может экспортировать:

- domain entities;
- domain value types и constants;
- service interfaces;
- gateway interfaces;
- public application input/output types;
- domain binding module;
- public helper DI classes/interfaces;
- exceptions, которые внешний UI должен ловить или распознавать.

Root не должен экспортировать:

- gateway DTO;
- mappers;
- `HttpRequest`;
- internal HTTP/request/event types;
- mock gateways;
- nested entity fragments, если внешний код не использует их как
  самостоятельную модель;
- любые типы, существующие только для реализации gateway/helper.

### Slice `index.ts`

Slice export отвечает на вопрос:

> Что является публичным API конкретного доменного среза?

Slice `index.ts` не должен быть dump-файлом. Он экспортирует только стабильные
части среза.

Допустимо:

```ts
export { TerminalEntity, TerminalsEntity } from './domain/terminal.entity.ts';
export type { TerminalStatus } from './domain/terminal.types.ts';
export { TerminalServiceInterface } from './application/terminal-service.interface.ts';
export { TerminalGatewayInterface } from './gateway/terminal-gateway.interface.ts';
```

Concrete implementation экспортируется из slice только если это нужно текущему
composition API. После появления domain binding module такая необходимость
должна исчезнуть для root.

Недопустимо:

```ts
export { CreateTerminalDto } from './gateway/dto/create-terminal.dto.ts';
export { TerminalMapper } from './gateway/terminal.mapper.ts';
export { MockTerminalGateway } from './gateway/mock-terminal.gateway.ts';
```

## Root API Inventory

Инвентаризация фиксирует текущее состояние `library/domain/src/index.ts`.
Это не команда на удаление экспортов. Любое снятие public export делается
отдельным шагом после проверки внешних потребителей.

### Оставить Public

Эти элементы соответствуют внешнему API пакета.

Domain/application facade:

```ts
DomainBindings;
```

Service и gateway interfaces:

```ts
AuthGatewayInterface;
AuthServiceInterface;
EmployeeGatewayInterface;
EmployeeInvitationGatewayInterface;
EmployeeInvitationServiceInterface;
EmployeeServiceInterface;
IncidentGatewayInterface;
IncidentServiceInterface;
LocalityGatewayInterface;
LocalityServiceInterface;
OperationalStateGatewayInterface;
OperationalStateServiceInterface;
ProfileGatewayInterface;
ProfileServiceInterface;
TerminalEventGatewayInterface;
TerminalEventServiceInterface;
TerminalFunctionsGatewayInterface;
TerminalFunctionsServiceInterface;
TerminalGatewayInterface;
TerminalRegistrationGatewayInterface;
TerminalRegistrationServiceInterface;
TerminalServiceInterface;
```

Domain entities, collections и доменные агрегаты:

```ts
AgentAccessPointEntity;
AmountEntity;
BanknoteAcceptorEntity;
BusinessDetailsEntity;
CashCassetteEntity;
CashDispenserEntity;
CreateEmployeeInvitationEntity;
DepositBagEntity;
EmployeeEntity;
EmployeeInvitationEntity;
EmployeeInvitationsEntity;
EmployeeInvitationStatusEntity;
EmployeesEntity;
EmployeeStatusEntity;
ErrorEntity;
IncidentDetailsEntity;
IncidentEntity;
IncidentHistoryEntity;
IncidentsEntity;
InventoryEntity;
LocalitiesEntity;
LocalityEntity;
LocationEntity;
ManagementSectionsEntity;
OperationalStateEntity;
OperationEntity;
OperationsEntity;
ProfileEntity;
RejectCassetteEntity;
RequestPasswordResetEntity;
TechnicalDetailsDevicesEntity;
TechnicalDetailsEntity;
TerminalEntity;
TerminalEventEntity;
TerminalEventsEntity;
TerminalFunctions;
TerminalRegistrationDetailsEntity;
TerminalRegistrationEntity;
TerminalRegistrationsEntity;
TerminalRegistrationTerminalEntity;
TerminalsEntity;
```

Domain constants и value types:

```ts
EMPLOYEE_MANAGEMENT_PERMISSIONS;
INCIDENT_HISTORY_INITIATOR_TYPES;
INCIDENT_HISTORY_TYPES;
INCIDENT_MANAGEMENT_PERMISSIONS;
INCIDENT_PRIORITIES;
INCIDENT_STATUSES;
INCIDENT_TYPES;
MANAGEMENT_SECTION_PERMISSIONS;
MANAGEMENT_SECTIONS;
TERMINAL_MANAGEMENT_PERMISSIONS;
EmployeeInvitationSection;
IncidentHistoryInitiatorType;
IncidentHistoryType;
IncidentPriority;
IncidentStatus;
IncidentType;
ManagementPermission;
ManagementSection;
ManagementSections;
```

Exceptions как внешний error contract:

```ts
BadGatewayException;
BadRequestException;
ConflictException;
ForbiddenException;
GatewayTimeoutException;
HttpException;
InternalServerErrorException;
LockoutException;
MethodNotAllowedException;
NotFoundException;
RequestTimeoutException;
ServiceUnavailableException;
TooManyRequestsException;
UnauthorizedException;
UnprocessableEntityException;
```

### Public Composition Helpers

Эти implementation classes остаются public, пока внешний host биндингует их
или использует напрямую как стабильный composition API.

```ts
Config;
RequestExecutor;
```

Concrete services/gateways больше не входят в root после введения
`DomainBindings`. Они остаются внутренними реализациями пакета.

### Internal Candidates

Эти элементы являются кишками и должны быть убраны из root в последующих
cleanup-шагах.

Gateway DTO:

Статус: DTO больше не экспортируются из root и public slice barrels. DTO также
убраны из service/gateway contracts и остались только внутри gateway adapters.

```ts
AcceptEmployeeInvitationDto;
ConfirmPasswordResetDto;
CreateEmployeeDto;
CreateEmployeeInvitationDto;
EmployeeFilterDto;
EmployeeInvitationFilterDto;
UpdateEmployeeDto;
```

Служебные HTTP-типы больше не экспортируются из root и helper barrels. Они
остаются доступны только внутри пакета через прямые package-local imports из
внутренних файлов `helpers/http-client`.

Остальные internal helpers (`HttpRequest`, `HttpErrorBus`, storage/signalr)
больше не экспортируются из root, но пока остаются доступны внутри пакета через
`helpers/index.ts` для gateway/binding слоя.

Исторически из root были убраны:

```ts
EventService;
EventServiceInterface;
HttpErrorBus;
HttpErrorBusInterface;
HttpRequest;
HttpErrorEvent;
HttpErrorListener;
HttpRequestConfig;
RequestExecutionContext;
RequestExecutionOptions;
RequestMode;
RequestOperation;
SignalRService;
SignalRServiceInterface;
StorageService;
StorageServiceInterface;
```

`SignalRService` и `StorageService` могут стать public helper API только если
появится внешний DI binding или внешний stable use case. До этого они не
должны попадать в root.

### Не Добавлять В Root

Запрещено добавлять в root без отдельного явного решения:

- registry interfaces для `DomainBindings`;
- mapper types/classes;
- DTO variants;
- mock/prototype options;
- request executor внутренние event/config/context types;
- types, нужные только для реализации публичного класса.

## Technical Debt

Техдолг фиксирует текущие нарушения правил. Он не означает, что всё надо
исправлять одним коммитом.

### TD-1. Root экспортировал concrete implementations

Статус: root cleanup выполнен. Concrete services/gateways больше не
экспортируются из `library/domain/src/index.ts`.

Историческая причина: host биндинговал реализации вручную. После
`DomainBindings` root не должен открывать реализации ради DI.

Целевое состояние:

- внешний host импортирует `DomainBindings`;
- concrete services/gateways используются внутри `DomainBindings`;
- root оставляет interfaces и domain models.

### TD-2. `DomainBindings` импортирует реализации только из внутренних путей

Статус: выполнено. `DomainBindings` импортирует concrete implementations через
package-local пути конкретных `application/` и `gateway/` файлов, а не через
широкий `../classes` barrel.

Целевое состояние:

- `DomainBindings` импортирует concrete implementations из внутренних путей;
- публичный `classes/index.ts` не используется как источник внутренних деталей;
- binding module не зависит от того, что slice случайно экспортирует наружу.

### TD-3. Root раскрывал внутреннюю helper-механику

Статус: root cleanup выполнен. `library/domain/src/index.ts` больше не
экспортирует `HttpRequest`, `HttpErrorBus`, request context/options/operation
types, storage/signalr services.

Оставшийся долг: `helpers/index.ts` всё ещё является широким internal barrel
для package-local imports.

`helpers/index.ts` сейчас поднимает наружу `HttpRequest`, `HttpErrorBus`,
request context/options/operation types, storage/signalr services.

Целевое состояние:

- public helper facade содержит только DI/error contract;
- gateway implementations импортируют internal helpers локально;
- root не экспортирует request/event/storage/signalr mechanics.

### TD-4. Service/Gateway Interfaces зависят от `gateway/dto`

Статус: выполнено. Service/gateway interfaces больше не импортируют DTO из
gateway layer. Исторически нарушение было найдено в:

```text
action-run/service/action-run-service.interface.ts
employee/service/employee-service.interface.ts
terminal/service/terminal-service.interface.ts
terminal-registration/service/terminal-registration-service.interface.ts
```

Также был очищен `employee-invitation`, где DTO уже были вынесены из root/slice
barrels, но оставались риском протекания через contracts.

Фактическое состояние:

- service interfaces перенесены в `application/`;
- service/gateway interfaces принимают локальные неэкспортируемые input types;
- DTO-классы остались только в `gateway/dto`;
- gateway implementations используют DTO-классы только для
  validation/serialization;
- локальные переменные после `plainToInstance` называются `*Payload`, а не
  `*Dto`, чтобы не смешивать application input и transport validation model.

Целевое состояние:

- service interfaces принимают application input types;
- gateway interfaces не ссылаются на DTO, если gateway interface экспортируется
  как public port;
- gateway DTO остаются внутри gateway layer;
- mapping выполняется в gateway/adapter слое.

### TD-5. UI напрямую использовал gateway DTO

Статус: прямой UI import `CreateEmployeeInvitationDto` из form schema
устранён. Форма использует frame-local action payload type.

Исторический внешний потребитель:

```text
frames/employee-invitation-create/src/view/content/form-view/form.schema.ts
```

Проблема:

```ts
type EmployeeInvitationFormData = Pick<CreateEmployeeInvitationDto, ...>;
```

Целевое состояние:

- form schema использует локальный form type или application input type;
- UI не зависит от gateway DTO.

### TD-6. Mock implementation экспортируется через slice/classes barrels

Статус: public barrels cleanup выполнен. `MockActionRunGateway` больше не
проходит через root/classes/slice barrels.

Исторически `MockActionRunGateway` проходил через slice/root exports.

Целевое состояние:

- mock/prototype adapters остаются internal;
- если mock нужен приложению, он подключается через отдельный controlled
  binding path, а не через root export.

### TD-7. Slice barrels смешивали разные уровни

Статус: public barrels cleanup выполнен. `classes/index.ts` и
`classes/<slice>/index.ts` больше не экспортируют concrete implementations,
DTO и mocks.

Исторически некоторые `classes/<slice>/index.ts` экспортировали одновременно:

- entities;
- service/gateway interfaces;
- concrete implementations;
- DTO;
- mock implementations.

Целевое состояние:

- slice public API выбирается вручную;
- DTO/mappers/mock не попадают в slice public barrel;
- root не реэкспортирует срез без фильтра.

### TD-8. Domain entities смешаны с validation/serialization model

Статус: общий исторический долг `library/domain`. Многие `domain/*.entity.ts`
импортируют `class-transformer` и `class-validator`. После сквозного переноса
срезов в `domain/application/gateway` это стало явной следующей границей
миграции.

```text
classes/*/domain/*.entity.ts
classes/technical-details/domain/sensors/**/*.entity.ts
```

Почему это долг:

- чистая domain model не должна зависеть от transport validation libraries;
- validation decorators описывают внешний контракт ответа/запроса, а не
  предметную сущность;
- gateway adapter должен валидировать transport DTO и затем маппить его в
  domain entity.

Целевое состояние:

- `domain/` содержит модели без `class-validator`/`class-transformer`;
- response/request validation classes живут в `gateway/dto`;
- gateway implementation делает `DTO -> domain entity` mapping;
- перенос файлов в `domain/` не считается полной очисткой слоя, пока decorators
  остаются в domain models.

## Lazy Domain Binding Module

Главная причина текущего over-export: внешний host вручную биндингует каждую
реализацию. Чтобы не открывать реализации только ради DI, пакет должен уметь
зарегистрировать свои реализации сам.

Целевой механизм:

```text
library/domain/src/bindings/
  domain-bindings.ts
  index.ts
```

Пример:

```ts
export class DomainBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ConfigInterface).to(Config).inSingletonScope();
    registry.bind(RequestExecutorInterface).to(RequestExecutor).inSingletonScope();

    registry.bind(TerminalGatewayInterface).to(TerminalGateway);
    registry.bind(TerminalServiceInterface).to(TerminalService);

    registry.bind(EmployeeGatewayInterface).to(EmployeeGateway);
    registry.bind(EmployeeServiceInterface).to(EmployeeService);
  }
}
```

Приложение-хост подключает пакет целиком:

```ts
new DomainBindings().register(registry);
```

Ленивая часть обеспечивается контейнером: binding rule регистрируется заранее,
но concrete instance создаётся только когда приложение запрашивает interface.

После этого root может экспортировать:

```ts
DomainBindings;
TerminalServiceInterface;
TerminalGatewayInterface;
TerminalEntity;
```

И не обязан экспортировать:

```ts
TerminalService;
TerminalGateway;
EmployeeService;
EmployeeGateway;
```

Реализации остаются внутри пакета и используются `DomainBindings`.

## Целевая Верхнеуровневая Структура

```text
library/domain/src/
  index.ts

  bindings/
    domain-bindings.ts
    index.ts

  helpers/
    index.ts
    config/
    request/
    http/
    storage/
    signalr/
    event/

  classes/
    index.ts
    terminal/
      domain/
      application/
      gateway/
      index.ts
    employee/
      domain/
      application/
      gateway/
      index.ts
    ...

  error.entity.ts
```

`helpers/index.ts` тоже должен быть public фасадом helpers, а не
автоматическим реэкспортом всех внутренних механизмов.

## Миграционная Стратегия

Миграция должна идти без массового переписывания всех срезов.

### Этап 0. Baseline Audit

Цель: зафиксировать текущее состояние перед изменениями.

Действия:

1. Снять список root exports из `library/domain/src/index.ts`.
2. Снять список импортов из `@library/domain` во внешних слоях:
   `clients`, `modules`, `frames`, `widgets`, `layouts`, `library/access`.
3. Отдельно найти:
   - DTO imports;
   - concrete implementation imports;
   - helper imports;
   - deep imports во внутренности `library/domain`.
4. Зафиксировать текущие проверки.

Проверки:

```bash
./node_modules/.bin/tsc -p library/domain/tsconfig.json --noEmit
yarn build:management_panel_ui
```

Критерий готовности:

- есть список публичных символов;
- есть список внешних потребителей;
- нет кода миграции.

### Этап 1. Добавить Правила Без Runtime Изменений

Цель: зафиксировать правила, не меняя API.

Действия:

1. Принять этот документ как рабочий migration plan.
2. При необходимости добавить короткую ссылку из `library/domain/AGENTS.md`.
3. Не менять `src/index.ts`.
4. Не переносить файлы.

Критерий готовности:

- правила согласованы;
- нет runtime/code изменений.

### Этап 2. Ввести `DomainBindings`

Цель: убрать необходимость внешнему host импортировать concrete
implementations по одной.

Действия:

1. Проверить текущий API `BindingModuleInterface` и
   `BindingRegistryInterface`.
2. Добавить `library/domain/src/bindings/domain-bindings.ts`.
3. Перенести туда текущие domain/helper bindings из
   `management-panel.bindings.ts`.
4. Экспортировать `DomainBindings` из root.
5. В `management-panel.bindings.ts` заменить ручной domain wiring на вызов
   `DomainBindings`.
6. На этом этапе не удалять старые concrete exports из root.

Критерий готовности:

- приложение собирает контейнер через `DomainBindings`;
- старые exports ещё доступны;
- build проходит.

Проверки:

```bash
./node_modules/.bin/tsc -p library/domain/tsconfig.json --noEmit
yarn build:management_panel_ui
```

### Этап 3. Сузить Root Exports Concrete Implementations

Цель: убрать concrete implementations из root, если они нужны только для
старого внешнего DI wiring.

Действия:

1. Поискать внешние импорты concrete classes:
   `TerminalGateway`, `TerminalService`, `EmployeeGateway`, etc.
2. Убедиться, что после `DomainBindings` они не нужны host.
3. Убрать concrete implementations из `src/index.ts`.
4. Оставить interfaces, entities, domain types, constants.
5. Если часть concrete classes реально нужна внешнему коду не для binding,
   разобрать отдельно и не удалять автоматически.

Критерий готовности:

- root больше не открывает реализации только ради DI;
- external imports не ломаются;
- build проходит.

### Этап 4. Разделить Public/Internal Helpers

Цель: оставить в root только helper API, который нужен внешнему приложению.

Статус: частично выполнено. Служебные HTTP-типы убраны из root и helper
barrels. `HttpRequest`, `HttpErrorBus`, `SignalRService`, `StorageService` уже
не экспортируются из root, но остаются в `helpers/index.ts` для внутренних
package-local imports gateway/binding слоя.

Действия:

1. Разделить `helpers/http-client` на public и internal exports на уровне
   barrel-файлов.
2. В root оставить:
   - `Config`, `ConfigInterface`;
   - `RequestExecutor`, `RequestExecutorInterface`;
   - public exceptions.
3. Убрать из root:
   - `HttpRequest`;
   - `HttpRequestConfig`;
   - `HttpErrorBus`;
   - `HttpErrorEvent`;
   - `HttpErrorListener`;
   - `RequestExecutionContext`;
   - `RequestExecutionOptions`;
   - `RequestMode`;
   - `RequestOperation`.
4. Проверить, что gateway implementations продолжают импортировать internal
   helpers через package-local relative imports.

Критерий готовности:

- external host видит только DI-facing helper API;
- gateway implementation не сломана;
- build проходит.

### Этап 5. Убрать DTO Из Application Boundaries

Статус: выполнено для текущих service/gateway interfaces.

Цель: service interfaces больше не зависят от `gateway/dto`.

Действия по каждому срезу отдельно:

1. Найти service interface imports из `gateway/dto`.
2. Создать application input type рядом с service boundary. Если input не
   должен быть публичным контрактом пакета, держать его неэкспортируемым в
   файле service interface. Отдельный `application/<slice>.inputs.ts`
   допустим только для осознанного public application contract.
3. Перевести service interface на input type.
4. Перевести service implementation на input type.
5. В gateway оставить DTO и mapping.
6. Если DTO и input пока совпадают, mapper может быть простым copy/identity,
   но роли должны быть разделены.
7. Убрать DTO из slice/root exports.

Затронутые срезы:

1. `action-run`.
2. `employee-invitation`.
3. `employee`.
4. `terminal`.
5. `terminal-registration`.

В этих срезах input-типы оставлены неэкспортируемыми в файлах public port
interfaces. DTO-классы остались в `gateway/dto` и используются concrete gateway
implementations для validation/serialization.

Критерий готовности:

- service interface не импортирует `gateway/dto`;
- DTO не импортируются внешними UI слоями;
- build проходит.

### Этап 6. Перенос Срезов На Новую Файловую Структуру

Статус: выполнено сквозным проходом по текущим `classes/*` срезам.

Цель: привести каждый срез к понятной структуре.

Порядок для одного среза:

1. Создать папки `domain`, `application`, `gateway`.
2. Переместить entity/types/constants в `domain`.
3. Переместить service interface/service в `application`.
4. Оставить gateway interface/gateway/dto в `gateway`.
5. Обновить package-local imports.
6. Обновить slice `index.ts` вручную.
7. Проверить внешние импорты из `@library/domain`.

Выполненный перенос:

- `service/` заменён на `application/`;
- `entities/` и root-level entity/types/constants перенесены в `domain/`;
- entity-only срезы также получили `domain/`;
- `technical-details/sensors` перенесён в `technical-details/domain/sensors`;
- slice `index.ts` остаётся public facade и не экспортирует DTO/mock/concrete
  implementations.

Не делать в этом этапе:

- не менять имена публичных типов без отдельного решения;
- не вычищать `class-validator`/`class-transformer` из domain entity в рамках
  структурного переноса, это отдельный TD-8;
- не трогать generated `types/` вручную.

Критерий готовности:

- все текущие срезы имеют единое расположение `domain/application/gateway`, где
  соответствующий слой реально существует;
- root exports не расширены случайно;
- build проходит.

### Этап 7. Mock/Prototype Adapters

Цель: не закреплять mock implementations как публичный API.

Правила:

- mock gateway лежит рядом с adapter implementation, но не экспортируется из
  root по умолчанию;
- если mock нужен composition layer, использовать controlled binding option или
  отдельный prototype binding module;
- mock не должен попадать в domain/application слой.

Возможные варианты:

```ts
new DomainBindings({ actionRunGateway: 'mock' }).register(registry);
```

или:

```ts
new DomainPrototypeBindings().register(registry);
```

Выбор варианта принимается отдельно перед реализацией mock/prototype flows.

## Правила Для Новых Срезов

При нулевом старте нового среза:

1. Начать с `domain`: entity/types/constants.
2. Добавить `application`: service interface/service/input types.
3. Добавить `gateway`: interface/implementation/dto.
4. Slice `index.ts` заполнить вручную.
5. В root `src/index.ts` добавить только то, что нужно внешнему приложению.
6. Если implementation нужна только для DI, сначала проверить возможность
   зарегистрировать её через `DomainBindings`, а не экспортировать из root.
7. DTO не использовать как UI form type.
8. DTO не использовать как service input type.
9. Mock не экспортировать из root.
10. Перед завершением проверить внешние imports.

## Что Считать Кишками

Кишки пакета:

- DTO;
- mappers;
- `HttpRequest`;
- request executor internal types;
- event bus internals;
- concrete mock implementations;
- validation-only classes;
- private nested entity fragments;
- helper types, существующие только для реализации gateway/helper;
- любые files, которые нужны только package-local imports.

Не кишки:

- domain entities;
- domain value types/constants;
- service interfaces;
- gateway interfaces;
- public application input/output types;
- `DomainBindings`;
- DI-facing helper classes/interfaces;
- exceptions, которые ловит внешний UI.

## Риски

### Риск: сломать внешний DI wiring

Митигация:

- сначала добавить `DomainBindings`;
- не удалять concrete exports на том же шаге;
- удалять concrete exports только после проверки внешних imports.

### Риск: косметическая чистка без архитектурного эффекта

Митигация:

- не начинать с удаления exports;
- сначала убрать причину over-export: ручной external binding concrete classes;
- затем чистить root.

### Риск: DTO останутся public через service interfaces

Митигация:

- не считать удаление DTO из root достаточным;
- переводить service interfaces на application inputs.

### Риск: слишком большая миграция

Митигация:

- выполнять сквозной перенос только после согласования цели миграции;
- закрывать перенос build-проверкой и grep-инвариантами;
- не переносить unrelated код.

## Definition Of Done Для Полной Миграции

Пакет считается приведённым к целевой модели, когда:

- root `src/index.ts` не экспортирует DTO, mappers, mocks и internal helper
  mechanics;
- host подключает domain через `DomainBindings`, а не биндингует каждую
  реализацию вручную;
- service/gateway interfaces не импортируют `gateway/dto`;
- новые срезы создаются по структуре `domain/application/gateway`;
- concrete gateway/service implementations не экспортируются из root только
  ради DI;
- helpers имеют public фасад и internal mechanics;
- `yarn build:management_panel_ui` проходит.

## Следующий Этап

Следующий архитектурный шаг после структурной миграции: разделить domain entity
и transport validation model.

Текущие `domain/*.entity.ts` всё ещё используют `class-validator` и
`class-transformer`. Это означает, что файлы уже лежат в правильном слое по
структуре, но модель ещё не полностью чистая по зависимостям. Чистка decorators
должна идти отдельным этапом, через response DTO в `gateway/dto` и mapping в
gateway adapter.
