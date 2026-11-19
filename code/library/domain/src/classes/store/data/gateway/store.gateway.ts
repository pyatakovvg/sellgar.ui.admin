import { Inject, Injectable, RequestExecutorInterface } from '@sellgar/app';
import { plainToInstance, type ClassConstructor } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../infrastructure/http-client';
import { StoreRecordInventoryEntity } from '../../domain/store-record-inventory.entity.ts';
import { StoreProductEntity } from '../../domain/store-product.entity.ts';
import { StoreProductResultEntity } from '../../domain/store-product-result.entity.ts';
import { AdjustRecordInventoryDto } from './dto/adjust-record-inventory.dto.ts';
import { ArchiveStoreProductDto } from './dto/archive-store-product.dto.ts';
import { CreateStoreProductDto } from './dto/create-store-product.dto.ts';
import { ReceiptRecordInventoryDto } from './dto/receipt-record-inventory.dto.ts';
import { StoreProductQueryDto } from './dto/store-product-query.dto.ts';
import { UpdateStoreProductDto } from './dto/update-store-product.dto.ts';
import { WriteOffRecordInventoryDto } from './dto/write-off-record-inventory.dto.ts';
import { AdjustRecordInventoryInput } from './input/adjust-record-inventory.input.ts';
import { ArchiveStoreProductInput } from './input/archive-store-product.input.ts';
import { CreateStoreProductInput } from './input/create-store-product.input.ts';
import { ReceiptRecordInventoryInput } from './input/receipt-record-inventory.input.ts';
import { StoreProductQueryInput } from './input/store-product-query.input.ts';
import { UpdateStoreProductInput } from './input/update-store-product.input.ts';
import { WriteOffRecordInventoryInput } from './input/write-off-record-inventory.input.ts';
import { StoreGatewayInterface } from './store-gateway.interface.ts';

@Injectable()
export class StoreGateway implements StoreGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(DeviceServiceInterface) private readonly deviceService: DeviceServiceInterface,
    @Inject(RequestExecutorInterface) private readonly requestExecutor: RequestExecutorInterface,
  ) {}

  async getAll(query?: StoreProductQueryInput): Promise<StoreProductResultEntity> {
    const dto = await this.toDto(StoreProductQueryDto, query ?? {});
    const result = await this.requestExecutor.run({ scope: 'store-products:list' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/store/products', { params: dto });
    });
    return this.toEntity(StoreProductResultEntity, result);
  }

  async findByUuid(uuid: string): Promise<StoreProductEntity> {
    const result = await this.requestExecutor.run({ scope: `store-product:${uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.get(this.config.get('GATEWAY_API') + '/v2/store/products/' + uuid);
    });
    return this.toEntity(StoreProductEntity, result);
  }

  async create(input: CreateStoreProductInput): Promise<StoreProductEntity> {
    const dto = await this.toDto(CreateStoreProductDto, input);
    const result = await this.requestExecutor.run({ scope: 'store-product:create' }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.post(this.config.get('GATEWAY_API') + '/v2/store/products', dto);
    });
    return this.toEntity(StoreProductEntity, result);
  }

  async update(input: UpdateStoreProductInput): Promise<StoreProductEntity> {
    const dto = await this.toDto(UpdateStoreProductDto, input);
    const result = await this.requestExecutor.run({ scope: `store-product:update:${dto.uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + '/v2/store/products/' + dto.uuid, dto);
    });
    return this.toEntity(StoreProductEntity, result);
  }

  async archive(input: ArchiveStoreProductInput): Promise<StoreProductEntity> {
    const dto = await this.toDto(ArchiveStoreProductDto, input);
    const result = await this.requestExecutor.run({ scope: `store-product:archive:${dto.uuid}` }, ({ signal }) => {
      const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
      return request.patch(this.config.get('GATEWAY_API') + `/v2/store/products/${dto.uuid}/archive`, dto);
    });
    return this.toEntity(StoreProductEntity, result);
  }

  async receiptInventory(input: ReceiptRecordInventoryInput): Promise<StoreRecordInventoryEntity> {
    const dto = await this.toDto(ReceiptRecordInventoryDto, input);
    const result = await this.requestExecutor.run(
      { scope: `store-record-inventory:receipt:${dto.recordUuid}` },
      ({ signal }) => {
        const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
        return request.post(
          this.config.get('GATEWAY_API') + `/v2/store/products/records/${dto.recordUuid}/inventory/receipt`,
          dto,
        );
      },
    );
    return this.toEntity(StoreRecordInventoryEntity, result);
  }

  async writeOffInventory(input: WriteOffRecordInventoryInput): Promise<StoreRecordInventoryEntity> {
    const dto = await this.toDto(WriteOffRecordInventoryDto, input);
    const result = await this.requestExecutor.run(
      { scope: `store-record-inventory:write-off:${dto.recordUuid}` },
      ({ signal }) => {
        const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
        return request.post(
          this.config.get('GATEWAY_API') + `/v2/store/products/records/${dto.recordUuid}/inventory/write-off`,
          dto,
        );
      },
    );
    return this.toEntity(StoreRecordInventoryEntity, result);
  }

  async adjustInventory(input: AdjustRecordInventoryInput): Promise<StoreRecordInventoryEntity> {
    const dto = await this.toDto(AdjustRecordInventoryDto, input);
    const result = await this.requestExecutor.run(
      { scope: `store-record-inventory:adjust:${dto.recordUuid}` },
      ({ signal }) => {
        const request = new HttpRequest({ deviceId: this.deviceService.getUniqueId(), signal });
        return request.post(
          this.config.get('GATEWAY_API') + `/v2/store/products/records/${dto.recordUuid}/inventory/adjust`,
          dto,
        );
      },
    );
    return this.toEntity(StoreRecordInventoryEntity, result);
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
