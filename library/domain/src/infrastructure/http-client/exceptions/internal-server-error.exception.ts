import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class InternalServerErrorException extends HttpException {
  constructor(response: string | Record<string, any> = 'Internal Server Error') {
    super(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
