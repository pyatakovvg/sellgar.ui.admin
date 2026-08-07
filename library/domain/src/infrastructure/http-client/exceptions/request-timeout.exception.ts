import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class RequestTimeoutException extends HttpException {
  constructor(response: string | Record<string, any> = 'Request Timeout') {
    super(response, HttpStatus.REQUEST_TIMEOUT);
  }
}
