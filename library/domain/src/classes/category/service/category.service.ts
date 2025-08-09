import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategoryDto } from './dto/update-category.dto.ts';

import { CategoryServiceInterface } from './category-service.interface.ts';
import { CategoryGatewayInterface } from '../gateway/category-gateway.interface.ts';

import { CategoryEntity, CategoryResultEntity } from '../category.entity.ts';

@injectable()
export class CategoryService implements CategoryServiceInterface {
  constructor(@inject(CategoryGatewayInterface) private readonly categoryGateway: CategoryGatewayInterface) {}

  async findAll(): Promise<CategoryResultEntity> {
    return await this.categoryGateway.findAll();
  }

  async findByUuid(uuid: string): Promise<CategoryEntity> {
    return await this.categoryGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const dtoInstance = plainToInstance(UpdateCategoryDto, dto);

    await validateOrReject(dtoInstance);

    return await this.categoryGateway.update(uuid, dtoInstance);
  }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const dtoInstance = plainToInstance(CreateCategoryDto, dto);

    await validateOrReject(dtoInstance);

    return await this.categoryGateway.create(dtoInstance);
  }
}
