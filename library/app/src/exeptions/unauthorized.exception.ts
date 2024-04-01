import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class UnauthorizedException extends HttpException {
  constructor(response: string | Record<string, any> = 'Unauthorized') {
    super(response, HttpStatus.UNAUTHORIZED);
  }
}
