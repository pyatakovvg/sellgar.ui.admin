import { HttpException } from './http.exception.ts';
import { HttpStatus } from '../enums/http-status.enum.ts';

export class GatewayTimeoutException extends HttpException {
  constructor(response: string | Record<string, any> = 'Gateway Timeout') {
    super(response, HttpStatus.GATEWAY_TIMEOUT);
  }
}
