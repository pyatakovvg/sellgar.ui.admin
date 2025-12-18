import { HttpException } from '../helpers/http-client';

export function httpLogger() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;

    descriptor.value = async function (...args: any[]) {
      const methodName = propertyKey;
      const startTime = Date.now();
      const requestId = Math.random().toString(36).substr(2, 9);

      try {
        const httpMethod = determineHttpMethod(methodName);
        const url = extractUrl(args);

        console.log(`[HTTP Request ${requestId}]`, {
          class: className,
          method: methodName,
          httpMethod,
          url,
          args: sanitizeArgs(args),
          timestamp: new Date().toISOString(),
        });

        const result = await originalMethod.apply(this, args);

        const executionTime = Date.now() - startTime;
        console.log(`[HTTP Response ${requestId}]`, {
          class: className,
          method: methodName,
          status: 'success',
          executionTime: `${executionTime}ms`,
          responseSize: JSON.stringify(result)?.length || 0,
          timestamp: new Date().toISOString(),
        });

        return result;
      } catch (error) {
        const httpError = error as HttpException;
        const executionTime = Date.now() - startTime;

        console.error(`[HTTP Error ${requestId}]`, {
          class: className,
          method: methodName,
          status: 'error',
          executionTime: `${executionTime}ms`,
          error: httpError.message,
          statusCode: httpError.getStatus(),
          timestamp: new Date().toISOString(),
        });

        throw error;
      }
    };

    return descriptor;
  };
}

function determineHttpMethod(methodName: string): string {
  const method = methodName.toLowerCase();

  if (method.includes('get')) return 'GET';
  if (method.includes('post')) return 'POST';
  if (method.includes('put')) return 'PUT';
  if (method.includes('delete')) return 'DELETE';
  if (method.includes('patch')) return 'PATCH';

  return 'UNKNOWN';
}

function extractUrl(args: any[]): string {
  for (const arg of args) {
    if (typeof arg === 'string' && (arg.startsWith('http') || arg.startsWith('/api'))) {
      return arg;
    }
    if (typeof arg === 'object' && arg.url) {
      return arg.url;
    }
  }
  return 'unknown';
}

function sanitizeArgs(args: any[]): any {
  return args.map((arg) => {
    if (typeof arg === 'object' && arg !== null) {
      const sanitized: any = {};
      Object.keys(arg).forEach((key) => {
        if (
          key.toLowerCase().includes('password') ||
          key.toLowerCase().includes('token') ||
          key.toLowerCase().includes('secret')
        ) {
          sanitized[key] = '*** MASKED ***';
        } else {
          sanitized[key] = arg[key];
        }
      });
      return sanitized;
    }
    return arg;
  });
}
