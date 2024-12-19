import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';

import { ProfileResultEntity } from '../profile.entity.ts';

import { ProfileGatewayInterface } from './profile-gateway.interface.ts';

@injectable()
export class ProfileGateway implements ProfileGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async get() {
    const result = await this.httpClient.get<ProfileResultEntity>(this.config.get('GATEWAY_API') + '/v1/auth/profile');
    const resultInstance = plainToInstance(ProfileResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
