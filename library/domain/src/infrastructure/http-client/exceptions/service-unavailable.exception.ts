import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class ServiceUnavailableException extends HttpException {
  constructor(response: string | Record<string, any> = 'Service Unavailable') {
    super(response, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
