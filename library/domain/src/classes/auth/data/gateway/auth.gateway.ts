import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { SocketTicketEntity } from '../../domain/socket-ticket.entity.ts';

import { type AuthGatewayInterface } from './auth-gateway.interface.ts';
import { SignInDto } from './dto/sign-in.dto.ts';

@Injectable()
export class AuthGateway implements AuthGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async signIn(login: string, password: string) {
    const dto = plainToInstance(SignInDto, { login, password });
    await validateOrReject(dto);
    await this.httpClient.post(this.config.get('GATEWAY_API') + '/v1/auth/sign-in', dto);
  }

  async signOut() {
    await this.httpClient.post(this.config.get('GATEWAY_API') + '/v1/auth/sign-out');
  }

  async issueSocketTicket(): Promise<SocketTicketEntity> {
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v1/auth/socket-ticket');
    const ticket = plainToInstance(SocketTicketEntity, result);

    await validateOrReject(ticket);

    return ticket;
  }
}
