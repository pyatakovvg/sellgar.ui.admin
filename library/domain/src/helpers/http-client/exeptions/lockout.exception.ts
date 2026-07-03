import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class LockoutException extends HttpException {
  constructor(response: string | Record<string, any> = 'Locked') {
    super(response, HttpStatus.LOCKED_ENTITY);
  }
}
