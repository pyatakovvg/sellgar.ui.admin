import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { AdjustInventoryDto } from './dto/adjust-inventory.dto.ts';
import { CreateDto } from './dto/create.dto.ts';
import { ReceiptInventoryDto } from './dto/receipt-inventory.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';
import { WriteOffInventoryDto } from './dto/write-off-inventory.dto.ts';

import { StoreOfferInventoryEntity, StoreProductEntity, StoreProductResultEntity } from '../store.entity.ts';

import { StoreGatewayInterface } from './store-gateway.interface.ts';

@injectable()
export class StoreGateway implements StoreGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll(query: any): Promise<StoreProductResultEntity> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store/products', {
      params: query,
    });
  }

  async findByUuid(uuid: string): Promise<StoreProductEntity> {
    return await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/store/products/' + uuid);
  }

  async create(dto: CreateDto): Promise<StoreProductEntity> {
    await validateOrReject(dto);

    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/store/products', dto);
  }

  async update(dto: UpdateDto): Promise<StoreProductEntity> {
    await validateOrReject(dto);

    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/store/products/' + dto.uuid, dto);
  }

  async receiptInventory(dto: ReceiptInventoryDto): Promise<StoreOfferInventoryEntity> {
    await validateOrReject(dto);

    return this.httpClient.post(this.config.get('GATEWAY_API') + `/v2/store/products/offers/${dto.offerUuid}/inventory/receipt`, dto);
  }

  async writeOffInventory(dto: WriteOffInventoryDto): Promise<StoreOfferInventoryEntity> {
    await validateOrReject(dto);

    return this.httpClient.post(this.config.get('GATEWAY_API') + `/v2/store/products/offers/${dto.offerUuid}/inventory/write-off`, dto);
  }

  async adjustInventory(dto: AdjustInventoryDto): Promise<StoreOfferInventoryEntity> {
    await validateOrReject(dto);

    return this.httpClient.post(this.config.get('GATEWAY_API') + `/v2/store/products/offers/${dto.offerUuid}/inventory/adjust`, dto);
  }
}
