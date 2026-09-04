import { Inject, Injectable } from '@sellgar/app';

import { CategoryServiceInterface } from './category-service.interface.ts';
import { CategoryGatewayInterface } from '../data/gateway/category-gateway.interface.ts';
import { CreateCategoryInput } from '../data/gateway/input/create-category.input.ts';
import { UpdateCategoryInput } from '../data/gateway/input/update-category.input.ts';
import { CategoryEntity } from '../domain/category.entity.ts';
import { CategoryResultEntity } from '../domain/category-result.entity.ts';

@Injectable()
export class CategoryService implements CategoryServiceInterface {
  constructor(@Inject(CategoryGatewayInterface) private readonly categoryGateway: CategoryGatewayInterface) {}

  findAll(): Promise<CategoryResultEntity> {
    return this.categoryGateway.findAll();
  }

  findByUuid(uuid: string): Promise<CategoryEntity> {
    return this.categoryGateway.findByUuid(uuid);
  }

  update(uuid: string, input: UpdateCategoryInput): Promise<CategoryEntity> {
    return this.categoryGateway.update(uuid, input);
  }

  create(input: CreateCategoryInput): Promise<CategoryEntity> {
    return this.categoryGateway.create(input);
  }
}
