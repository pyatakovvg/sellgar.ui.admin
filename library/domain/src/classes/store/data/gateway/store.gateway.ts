import { Inject, Injectable } from '@sellgar/app';
import { plainToInstance, type ClassConstructor } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import { HttpClientInterface } from '../../../../infrastructure/http-client/http-client.interface.ts';
import { StoreOfferInventoryEntity } from '../../domain/store-offer-inventory.entity.ts';
import { StoreProductEntity } from '../../domain/store-product.entity.ts';
import { StoreProductResultEntity } from '../../domain/store-product-result.entity.ts';
import { AdjustOfferInventoryDto } from './dto/adjust-offer-inventory.dto.ts';
import { ArchiveStoreProductDto } from './dto/archive-store-product.dto.ts';
import { CreateStoreProductDto } from './dto/create-store-product.dto.ts';
import { ReceiptOfferInventoryDto } from './dto/receipt-offer-inventory.dto.ts';
import { StoreProductQueryDto } from './dto/store-product-query.dto.ts';
import { UpdateStoreProductDto } from './dto/update-store-product.dto.ts';
import { WriteOffOfferInventoryDto } from './dto/write-off-offer-inventory.dto.ts';
import { AdjustOfferInventoryInput } from './input/adjust-offer-inventory.input.ts';
import { ArchiveStoreProductInput } from './input/archive-store-product.input.ts';
import { CreateStoreProductInput } from './input/create-store-product.input.ts';
import { ReceiptOfferInventoryInput } from './input/receipt-offer-inventory.input.ts';
import { StoreProductQueryInput } from './input/store-product-query.input.ts';
import { UpdateStoreProductInput } from './input/update-store-product.input.ts';
import { WriteOffOfferInventoryInput } from './input/write-off-offer-inventory.input.ts';
import { StoreGatewayInterface } from './store-gateway.interface.ts';

@Injectable()
export class StoreGateway implements StoreGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(query?: StoreProductQueryInput): Promise<StoreProductResultEntity> {
    const dto = await this.toDto(StoreProductQueryDto, query ?? {});
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store/products', { params: dto });
    return this.toEntity(StoreProductResultEntity, result);
  }

  async findByUuid(uuid: string): Promise<StoreProductEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store/products/' + uuid);
    return this.toEntity(StoreProductEntity, result);
  }

  async create(input: CreateStoreProductInput): Promise<StoreProductEntity> {
    const dto = await this.toDto(CreateStoreProductDto, input);
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/store/products', dto);
    return this.toEntity(StoreProductEntity, result);
  }

  async update(input: UpdateStoreProductInput): Promise<StoreProductEntity> {
    const dto = await this.toDto(UpdateStoreProductDto, input);
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/store/products/' + dto.uuid, dto);
    return this.toEntity(StoreProductEntity, result);
  }

  async archive(input: ArchiveStoreProductInput): Promise<StoreProductEntity> {
    const dto = await this.toDto(ArchiveStoreProductDto, input);
    const result = await this.httpClient.patch(
      this.config.get('GATEWAY_API') + `/v2/store/products/${dto.uuid}/archive`,
      dto,
    );
    return this.toEntity(StoreProductEntity, result);
  }

  async receiptInventory(input: ReceiptOfferInventoryInput): Promise<StoreOfferInventoryEntity> {
    const dto = await this.toDto(ReceiptOfferInventoryDto, input);
    const result = await this.httpClient.post(
      this.config.get('GATEWAY_API') + `/v2/store/products/offers/${dto.offerUuid}/inventory/receipt`,
      dto,
    );
    return this.toEntity(StoreOfferInventoryEntity, result);
  }

  async writeOffInventory(input: WriteOffOfferInventoryInput): Promise<StoreOfferInventoryEntity> {
    const dto = await this.toDto(WriteOffOfferInventoryDto, input);
    const result = await this.httpClient.post(
      this.config.get('GATEWAY_API') + `/v2/store/products/offers/${dto.offerUuid}/inventory/write-off`,
      dto,
    );
    return this.toEntity(StoreOfferInventoryEntity, result);
  }

  async adjustInventory(input: AdjustOfferInventoryInput): Promise<StoreOfferInventoryEntity> {
    const dto = await this.toDto(AdjustOfferInventoryDto, input);
    const result = await this.httpClient.post(
      this.config.get('GATEWAY_API') + `/v2/store/products/offers/${dto.offerUuid}/inventory/adjust`,
      dto,
    );
    return this.toEntity(StoreOfferInventoryEntity, result);
  }

  private async toDto<T extends object>(type: ClassConstructor<T>, input: object): Promise<T> {
    const dto = plainToInstance(type, input, { exposeUnsetFields: false });
    await validateOrReject(dto);
    return dto;
  }

  private async toEntity<T extends object>(type: ClassConstructor<T>, result: unknown): Promise<T> {
    const entity = plainToInstance(type, result);
    await validateOrReject(entity);
    return entity;
  }
}
