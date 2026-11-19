import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app';
import { plainToInstance, type ClassConstructor } from 'class-transformer';
import { isUUID, validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client';
import { CartEntity } from '../../domain/cart.entity.ts';
import { CartItemMutationEntity } from '../../domain/cart-item-mutation.entity.ts';
import { CartResultEntity } from '../../domain/cart-result.entity.ts';
import { CartGatewayInterface } from './cart-gateway.interface.ts';
import { CartQueryDto } from './dto/cart-query.dto.ts';
import { AddCartItemDto } from './dto/add-cart-item.dto.ts';
import { RemoveCartItemDto } from './dto/remove-cart-item.dto.ts';
import { SetCartItemQuantityDto } from './dto/set-cart-item-quantity.dto.ts';
import type { AddCartItemInput } from './input/add-cart-item.input.ts';
import type { CartQueryInput } from './input/cart-query.input.ts';
import type { RemoveCartItemInput } from './input/remove-cart-item.input.ts';
import type { SetCartItemQuantityInput } from './input/set-cart-item-quantity.input.ts';

@Injectable()
export class CartGateway implements CartGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async getAll(query?: CartQueryInput): Promise<CartResultEntity> {
    const dto = await this.toDto(CartQueryDto, query ?? {});
    const result = await this.requestExecutor.run({ scope: 'carts:list' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v1/carts', { params: dto });
    });

    return this.toEntity(CartResultEntity, result);
  }

  async findByUuid(uuid: string): Promise<CartEntity> {
    this.validateUuid(uuid);
    const result = await this.requestExecutor.run({ scope: `cart:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v1/carts/' + uuid);
    });

    return this.toEntity(CartEntity, result);
  }

  async addItem(uuid: string, input: AddCartItemInput): Promise<CartItemMutationEntity> {
    this.validateUuid(uuid);
    const dto = await this.toDto(AddCartItemDto, input);
    const result = await this.requestExecutor.run({ scope: `cart:add:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + `/v1/carts/${uuid}/items`, dto);
    });

    return this.toEntity(CartItemMutationEntity, result);
  }

  async setItemQuantity(
    uuid: string,
    recordUuid: string,
    input: SetCartItemQuantityInput,
  ): Promise<CartItemMutationEntity> {
    this.validateUuid(uuid);
    this.validateUuid(recordUuid);
    const dto = await this.toDto(SetCartItemQuantityDto, input);
    const result = await this.requestExecutor.run(
      { scope: `cart:set-quantity:${uuid}:${recordUuid}` },
      ({ signal }) => {
        const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
        return request.patch(this.config.get('GATEWAY_API') + `/v1/carts/${uuid}/items/${recordUuid}`, dto);
      },
    );

    return this.toEntity(CartItemMutationEntity, result);
  }

  async removeItem(uuid: string, recordUuid: string, input: RemoveCartItemInput): Promise<CartItemMutationEntity> {
    this.validateUuid(uuid);
    this.validateUuid(recordUuid);
    const dto = await this.toDto(RemoveCartItemDto, input);
    const result = await this.requestExecutor.run({ scope: `cart:remove:${uuid}:${recordUuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.delete(this.config.get('GATEWAY_API') + `/v1/carts/${uuid}/items/${recordUuid}`, { data: dto });
    });

    return this.toEntity(CartItemMutationEntity, result);
  }

  private validateUuid(uuid: string): void {
    if (!isUUID(uuid)) throw new Error('Invalid cart or record UUID');
  }

  private async toDto<T extends object>(type: ClassConstructor<T>, input: object): Promise<T> {
    const dto = plainToInstance(type, input, { exposeUnsetFields: false, excludeExtraneousValues: true });
    await validateOrReject(dto);

    return dto;
  }

  private async toEntity<T extends object>(type: ClassConstructor<T>, result: unknown): Promise<T> {
    const entity = plainToInstance(type, result, { excludeExtraneousValues: true });
    await validateOrReject(entity);

    return entity;
  }
}
