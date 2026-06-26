import { inject, injectable } from 'inversify';

import { VariantServiceInterface } from './variant-service.interface.ts';
import { VariantGatewayInterface } from '../gateway/variant-gateway.interface.ts';

import { CreateProductDto } from '../gateway/dto/create-product.dto.ts';
import { UpdateProductDto } from '../gateway/dto/update-product.dto.ts';
import { AddVariantImageDto } from '../gateway/dto/add-variant-image.dto.ts';

import { VariantEntity, ProductVariantResultEntity } from '../variant.entity.ts';

@injectable()
export class VariantService implements VariantServiceInterface {
  constructor(@inject(VariantGatewayInterface) private readonly productGateway: VariantGatewayInterface) {}

  async findAll(): Promise<ProductVariantResultEntity> {
    return await this.productGateway.findAll();
  }

  async findByUuid(uuid: string): Promise<VariantEntity | null> {
    return await this.productGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateProductDto): Promise<VariantEntity> {
    return this.productGateway.update(uuid, dto);
  }

  async create(dto: CreateProductDto): Promise<VariantEntity> {
    return await this.productGateway.create(dto);
  }

  async addImage(variantUuid: string, dto: AddVariantImageDto): Promise<VariantEntity> {
    return await this.productGateway.addImage(variantUuid, dto);
  }

  async removeImage(variantUuid: string, imageUuid: string): Promise<VariantEntity> {
    return await this.productGateway.removeImage(variantUuid, imageUuid);
  }
}
