import { Inject, Injectable } from '@sellgar/app';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';

import { ProfileEntity } from '../../domain/profile.entity.ts';

import { ProfileGatewayInterface } from './profile-gateway.interface.ts';

@Injectable()
export class ProfileGateway implements ProfileGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async get() {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v1/auth/profile');
    const resultInstance = plainToInstance(ProfileEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
