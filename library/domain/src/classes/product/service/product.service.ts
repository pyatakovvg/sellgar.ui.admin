import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { ProductServiceInterface } from './product-service.interface.ts';
import { ProductGatewayInterface } from '../gateway/product-gateway.interface.ts';

@injectable()
export class ProductService implements ProductServiceInterface {
  constructor(@inject(ProductGatewayInterface) private readonly productGateway: ProductGatewayInterface) {}

  async findAll() {
    return await this.productGateway.findAll();
  }

  async findByUuid(uuid: string) {
    return await this.productGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateProductDto) {
    const dtoInstance = plainToInstance(UpdateProductDto, dto);

    await validateOrReject(dtoInstance);

    return this.productGateway.update(uuid, dtoInstance);
  }

  async create(dto: CreateProductDto) {
    const dtoInstance = plainToInstance(CreateProductDto, dto);

    await validateOrReject(dtoInstance);

    return await this.productGateway.create(dtoInstance);
  }
}
