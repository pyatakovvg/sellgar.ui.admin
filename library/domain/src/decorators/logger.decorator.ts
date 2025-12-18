/**
 * LoggerOptions
 * @logArgs - логировать аргументы (по умолчанию true)
 */
export interface LoggerOptions {
  logArgs?: boolean;
  logResult?: boolean;
  logExecutionTime?: boolean;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  excludeArgs?: string[]; // Имена аргументов, которые не нужно логировать
}

export function logger(options: LoggerOptions = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const { logArgs = true, logResult = true, logExecutionTime = true, logLevel = 'info', excludeArgs = [] } = options;

    const originalMethod = descriptor.value;
    const className = target.constructor.name;
    const methodName = propertyKey;

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      const logId = Math.random().toString(36).substr(2, 9);

      // Получаем имена параметров метода
      const paramNames = getParamNames(originalMethod);

      // Формируем логируемые аргументы
      const loggedArgs = logArgs
        ? paramNames.reduce(
            (acc, name, index) => {
              if (!excludeArgs.includes(name) && args[index] !== undefined) {
                acc[name] = args[index];
              }
              return acc;
            },
            {} as Record<string, any>,
          )
        : undefined;

      // Логируем начало выполнения
      logMessage(logLevel, `[${logId}] ${className}.${methodName} - Start`, {
        args: loggedArgs,
        timestamp: startTime,
      });

      try {
        const result = await originalMethod.apply(this, args);

        const executionTime = Date.now() - startTime;
        const logData: any = {
          executionTime: logExecutionTime ? `${executionTime}ms` : undefined,
          timestamp: new Date().toISOString(),
        };

        if (logResult) {
          logData.result = result;
        } else if (result !== undefined) {
          logData.hasResult = true;
          logData.resultType = typeof result;
        }

        logMessage(logLevel, `[${logId}] ${className}.${methodName} - Success`, logData);

        return result;
      } catch (error) {
        const executionTime = Date.now() - startTime;

        logMessage('error', `[${logId}] ${className}.${methodName} - Error`, {
          executionTime: `${executionTime}ms`,
          error: (error as Error).message,
          errorName: (error as Error).name,
          stack: (error as Error).stack,
          timestamp: new Date().toISOString(),
        });

        throw error;
      }
    };

    return descriptor;
  };
}

// Вспомогательные функции
function getParamNames(func: Function): string[] {
  const str = func.toString();
  const paramsMatch = str.match(/\(([^)]*)\)/);

  if (!paramsMatch) return [];

  return paramsMatch[1]
    .split(',')
    .map((param) => param.trim())
    .filter((param) => param)
    .map((param) => param.split('=')[0].trim());
}

function logMessage(level: string, message: string, data?: any) {
  const logEntry = { message, ...data };

  switch (level) {
    case 'debug':
      console.debug(JSON.stringify(logEntry, null, 2));
      break;
    case 'info':
      console.info(JSON.stringify(logEntry, null, 2));
      break;
    case 'warn':
      console.warn(JSON.stringify(logEntry, null, 2));
      break;
    case 'error':
      console.error(JSON.stringify(logEntry, null, 2));
      break;
    default:
      console.log(JSON.stringify(logEntry, null, 2));
  }
}
