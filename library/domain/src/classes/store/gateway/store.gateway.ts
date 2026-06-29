import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { AdjustOfferInventoryDto } from './dto/adjust-offer-inventory.dto.ts';
import { ArchiveStoreProductDto } from './dto/archive-store-product.dto.ts';
import { CreateStoreProductDto } from './dto/create-store-product.dto.ts';
import { ReceiptOfferInventoryDto } from './dto/receipt-offer-inventory.dto.ts';
import { StoreProductQueryDto } from './dto/store-product-query.dto.ts';
import { UpdateStoreProductDto } from './dto/update-store-product.dto.ts';
import { WriteOffOfferInventoryDto } from './dto/write-off-offer-inventory.dto.ts';

import { StoreOfferInventoryEntity, StoreProductEntity, StoreProductResultEntity } from '../store.entity.ts';

import { StoreGatewayInterface } from './store-gateway.interface.ts';

@injectable()
export class StoreGateway implements StoreGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(query?: StoreProductQueryDto): Promise<StoreProductResultEntity> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store/products', {
      params: query,
    });
  }

  async findByUuid(uuid: string): Promise<StoreProductEntity> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store/products/' + uuid);
  }

  async create(dto: CreateStoreProductDto): Promise<StoreProductEntity> {
    await validateOrReject(dto);

    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/store/products', dto);
  }

  async update(dto: UpdateStoreProductDto): Promise<StoreProductEntity> {
    await validateOrReject(dto);

    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/store/products/' + dto.uuid, dto);
  }

  async archive(dto: ArchiveStoreProductDto): Promise<StoreProductEntity> {
    await validateOrReject(dto);

    return this.httpClient.patch(this.config.get('GATEWAY_API') + `/v2/store/products/${dto.uuid}/archive`, dto);
  }

  async receiptInventory(dto: ReceiptOfferInventoryDto): Promise<StoreOfferInventoryEntity> {
    await validateOrReject(dto);

    return this.httpClient.post(this.config.get('GATEWAY_API') + `/v2/store/products/offers/${dto.offerUuid}/inventory/receipt`, dto);
  }

  async writeOffInventory(dto: WriteOffOfferInventoryDto): Promise<StoreOfferInventoryEntity> {
    await validateOrReject(dto);

    return this.httpClient.post(this.config.get('GATEWAY_API') + `/v2/store/products/offers/${dto.offerUuid}/inventory/write-off`, dto);
  }

  async adjustInventory(dto: AdjustOfferInventoryDto): Promise<StoreOfferInventoryEntity> {
    await validateOrReject(dto);

    return this.httpClient.post(this.config.get('GATEWAY_API') + `/v2/store/products/offers/${dto.offerUuid}/inventory/adjust`, dto);
  }
}
