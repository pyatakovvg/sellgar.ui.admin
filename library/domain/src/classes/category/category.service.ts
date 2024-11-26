import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CategoryEntity, CategoryResultEntity } from './entity/category.entity.ts';

import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategoryDto } from './dto/update-category.dto.ts';

import { CategoryGateway, CategoryGatewaySymbol } from './category.gateway.ts';

export const CategoryServiceSymbol = Symbol.for('CategoryService');

@injectable()
export class CategoryService {
  constructor(@inject(CategoryGatewaySymbol) private readonly categoryGateway: CategoryGateway) {}

  async findByUuid(uuid: string) {
    const result = await this.categoryGateway.findByUuid(uuid);
    const resultInstance = plainToInstance(CategoryEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findAll() {
    const result = await this.categoryGateway.findAll();
    const resultInstance = plainToInstance(CategoryResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  update(uuid: string, dto: UpdateCategoryDto) {
    return this.categoryGateway.update(uuid, dto);
  }

  create(dto: CreateCategoryDto) {
    return this.categoryGateway.create(dto);
  }
}
