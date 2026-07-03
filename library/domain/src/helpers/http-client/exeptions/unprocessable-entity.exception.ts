import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class UnprocessableEntityException extends HttpException {
  constructor(response: string | Record<string, any> = 'Unprocessable Entity') {
    super(response, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
