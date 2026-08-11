import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';

import { ProfileEntity } from '../../domain/profile.entity.ts';

import { ProfileGatewayInterface } from './profile-gateway.interface.ts';

@Injectable()
export class ProfileGateway implements ProfileGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async get() {
    const result = await this.requestExecutor.run({ scope: 'profile:get' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v1/auth/profile');
    });
    const resultInstance = plainToInstance(ProfileEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
