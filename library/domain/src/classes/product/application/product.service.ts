import { Inject, Injectable } from '@tiyn/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { ProductServiceInterface } from './product-service.interface.ts';
import { ProductGatewayInterface } from '../gateway/product-gateway.interface.ts';

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(@Inject(ProductGatewayInterface) private readonly productGateway: ProductGatewayInterface) {}

  async findAll() {
    return await this.productGateway.findAll();
  }

  async findByUuid(uuid: string) {
    return await this.productGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateProductDto) {
    const dtoInstance = plainToInstance(UpdateProductDto, this.createValidationDto(dto));

    await validateOrReject(dtoInstance);

    return this.productGateway.update(uuid, dto);
  }

  async create(dto: CreateProductDto) {
    const dtoInstance = plainToInstance(CreateProductDto, this.createValidationDto(dto));

    await validateOrReject(dtoInstance);

    return await this.productGateway.create(dto);
  }

  private createValidationDto<T extends CreateProductDto | UpdateProductDto>(dto: T): T {
    return {
      ...dto,
      variants: dto.variants.map((variant) => ({
        ...variant,
        images: variant.images?.map(({ file: _file, ...image }) => image),
      })),
    };
  }
}
