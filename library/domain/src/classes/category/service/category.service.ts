import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CategoryEntity, CategoryResultEntity } from '../category.entity.ts';

import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategoryDto } from './dto/update-category.dto.ts';

import { CategoryServiceInterface } from './category-service.interface.ts';
import { CategoryGatewayInterface } from '../gateway/category-gateway.interface.ts';

@injectable()
export class CategoryService implements CategoryServiceInterface {
  constructor(@inject(CategoryGatewayInterface) private readonly categoryGateway: CategoryGatewayInterface) {}

  async findAll(): Promise<CategoryResultEntity> {
    const result = await this.categoryGateway.findAll();
    const resultInstance = plainToInstance(CategoryResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string): Promise<CategoryEntity> {
    const result = await this.categoryGateway.findByUuid(uuid);
    const resultInstance = plainToInstance(CategoryEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const result = await this.categoryGateway.update(uuid, updateCategoryDto);
    const resultInstance = plainToInstance(CategoryEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const result = await this.categoryGateway.create(createCategoryDto);
    const resultInstance = plainToInstance(CategoryEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }
}
