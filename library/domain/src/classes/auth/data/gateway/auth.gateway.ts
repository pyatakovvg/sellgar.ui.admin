import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app-v2';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';
import { SocketTicketEntity } from '../../domain/socket-ticket.entity.ts';

import { type AuthGatewayInterface } from './auth-gateway.interface.ts';
import { SignInDto } from './dto/sign-in.dto.ts';

@Injectable()
export class AuthGateway implements AuthGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async signIn(login: string, password: string) {
    const dto = plainToInstance(SignInDto, { login, password });
    await validateOrReject(dto);
    await this.requestExecutor.run({ scope: 'auth:sign-in' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v1/auth/sign-in', dto);
    });
  }

  async signOut() {
    await this.requestExecutor.run({ scope: 'auth:sign-out' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v1/auth/sign-out', undefined);
    });
  }

  async issueSocketTicket(): Promise<SocketTicketEntity> {
    const result = await this.requestExecutor.run({ scope: 'auth:socket-ticket' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v1/auth/socket-ticket', undefined);
    });
    const ticket = plainToInstance(SocketTicketEntity, result);

    await validateOrReject(ticket);

    return ticket;
  }
}
