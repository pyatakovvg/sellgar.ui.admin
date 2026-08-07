import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class BadGatewayException extends HttpException {
  constructor(response: string | Record<string, any> = 'Bad Gateway') {
    super(response, HttpStatus.BAD_GATEWAY);
  }
}
