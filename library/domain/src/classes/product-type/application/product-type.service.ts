import { Inject, Injectable } from '@sellgar/app';

import { ProductTypeGatewayInterface } from '../data/gateway/product-type-gateway.interface.ts';
import { ProductTypeEntity } from '../domain/product-type.entity.ts';
import { ProductTypeResultEntity } from '../domain/product-type-result.entity.ts';
import { ProductTypeServiceInterface } from './product-type-service.interface.ts';
import type { CreateProductTypeInput } from '../data/gateway/input/create-product-type.input.ts';
import type { UpdateProductTypeInput } from '../data/gateway/input/update-product-type.input.ts';

@Injectable()
export class ProductTypeService implements ProductTypeServiceInterface {
  constructor(@Inject(ProductTypeGatewayInterface) private readonly gateway: ProductTypeGatewayInterface) {}

  findAll(): Promise<ProductTypeResultEntity> {
    return this.gateway.findAll();
  }

  findByUuid(uuid: string): Promise<ProductTypeEntity> {
    return this.gateway.findByUuid(uuid);
  }

  create(input: CreateProductTypeInput): Promise<ProductTypeEntity> {
    return this.gateway.create(input);
  }

  update(uuid: string, input: UpdateProductTypeInput): Promise<ProductTypeEntity> {
    return this.gateway.update(uuid, input);
  }
}
