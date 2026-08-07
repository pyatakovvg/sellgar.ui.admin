import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class WafBlockedException extends HttpException {
  constructor(response: string | Record<string, any> = 'Blocked by WAF') {
    super(response, HttpStatus.I_AM_A_TEAPOT);
  }
}
