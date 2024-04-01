import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class MethodNotAllowedException extends HttpException {
  constructor(response: string | Record<string, any> = 'Method Not Allowed') {
    super(response, HttpStatus.METHOD_NOT_ALLOWED);
  }
}
