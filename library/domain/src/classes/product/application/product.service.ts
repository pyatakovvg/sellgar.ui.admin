import { Inject, Injectable } from '@sellgar/app';

import { ProductServiceInterface } from './product-service.interface.ts';
import { ProductGatewayInterface } from '../data/gateway/product-gateway.interface.ts';
import { CreateProductInput } from '../data/gateway/input/create-product.input.ts';
import { UpdateProductInput } from '../data/gateway/input/update-product.input.ts';
import { ProductEntity } from '../domain/product.entity.ts';
import { ProductResultEntity } from '../domain/product-result.entity.ts';

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(@Inject(ProductGatewayInterface) private readonly productGateway: ProductGatewayInterface) {}

  findAll(): Promise<ProductResultEntity> {
    return this.productGateway.findAll();
  }

  findByUuid(uuid: string): Promise<ProductEntity> {
    return this.productGateway.findByUuid(uuid);
  }

  update(uuid: string, input: UpdateProductInput): Promise<ProductEntity> {
    return this.productGateway.update(uuid, input);
  }

  create(input: CreateProductInput): Promise<ProductEntity> {
    return this.productGateway.create(input);
  }
}
