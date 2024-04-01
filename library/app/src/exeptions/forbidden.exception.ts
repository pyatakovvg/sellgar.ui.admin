import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class ForbiddenException extends HttpException {
  constructor(response: string | Record<string, any> = 'Forbidden') {
    super(response, HttpStatus.FORBIDDEN);
  }
}
