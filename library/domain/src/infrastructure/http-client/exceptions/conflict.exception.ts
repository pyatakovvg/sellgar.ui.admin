import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class ConflictException extends HttpException {
  constructor(response: string | Record<string, any> = 'Conflict') {
    super(response, HttpStatus.CONFLICT);
  }
}
