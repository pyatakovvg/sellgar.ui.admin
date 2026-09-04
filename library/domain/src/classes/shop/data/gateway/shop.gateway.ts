import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client/index.ts';
import { ShopEntity } from '../../domain/shop.entity.ts';
import { ShopResultEntity } from '../../domain/shop-result.entity.ts';
import { CreateShopDto } from './dto/create-shop.dto.ts';
import { UpdateShopDto } from './dto/update-shop.dto.ts';
import { CreateShopInput } from './input/create-shop.input.ts';
import { UpdateShopInput } from './input/update-shop.input.ts';
import { ShopGatewayInterface } from './shop-gateway.interface.ts';

@Injectable()
export class ShopGateway implements ShopGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async findAll(): Promise<ShopResultEntity> {
    const result = await this.requestExecutor.run({ scope: 'shops:list' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/shops');
    });
    const entity = plainToInstance(ShopResultEntity, result);
    await validateOrReject(entity);
    return entity;
  }

  async findByUuid(uuid: string): Promise<ShopEntity> {
    const result = await this.requestExecutor.run({ scope: `shop:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/shops/' + uuid);
    });
    return this.toShop(result);
  }

  async create(input: CreateShopInput): Promise<ShopEntity> {
    const dto = plainToInstance(CreateShopDto, input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: 'shop:create' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v2/shops', dto);
    });
    return this.toShop(result);
  }

  async update(uuid: string, input: UpdateShopInput): Promise<ShopEntity> {
    const dto = plainToInstance(UpdateShopDto, input);
    await validateOrReject(dto);
    const result = await this.requestExecutor.run({ scope: `shop:update:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + '/v2/shops/' + uuid, dto);
    });
    return this.toShop(result);
  }

  private async toShop(result: unknown): Promise<ShopEntity> {
    const entity = plainToInstance(ShopEntity, result);
    await validateOrReject(entity);
    return entity;
  }
}
