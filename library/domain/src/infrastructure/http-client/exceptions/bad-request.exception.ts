import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class BadRequestException extends HttpException {
  constructor(response: string | Record<string, any> = 'Bad Request') {
    super(response, HttpStatus.BAD_REQUEST);
  }
}
