import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';
import { PriceEntity } from '../../domain/price.entity.ts';
import { PriceResultEntity } from '../../domain/price-result.entity.ts';
import { CreatePriceDto } from './dto/create-price.dto.ts';
import { CreatePriceInput } from './input/create-price.input.ts';
import { PriceGatewayInterface } from './price-gateway.interface.ts';

@Injectable()
export class PriceGateway implements PriceGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async findAll(storeUuid: string): Promise<PriceResultEntity> {
    const result = await this.requestExecutor.run({ scope: `store-prices:list:${storeUuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/store/' + storeUuid + '/prices');
    });
    const entity = plainToInstance(PriceResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async create(storeUuid: string, input: CreatePriceInput): Promise<PriceEntity> {
    const dto = plainToInstance(CreatePriceDto, input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: `store-price:create:${storeUuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v2/store/' + storeUuid + '/prices', dto);
    });
    const entity = plainToInstance(PriceEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
