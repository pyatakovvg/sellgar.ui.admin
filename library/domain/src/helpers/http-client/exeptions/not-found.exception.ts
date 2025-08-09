import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class NotFoundException extends HttpException {
  constructor(response: string | Record<string, any> = 'Not Found') {
    super(response, HttpStatus.NOT_FOUND);
  }
}
