import { Inject, Injectable } from '@sellgar/app';

import { CategoryServiceInterface } from './category-service.interface.ts';
import { CategoryGatewayInterface } from '../data/gateway/category-gateway.interface.ts';
import { CreateCategoryInput } from '../data/gateway/input/create-category.input.ts';
import { UpdateCategoryInput } from '../data/gateway/input/update-category.input.ts';
import { CategoryEntity } from '../domain/category.entity.ts';
import { CategoryTreeEntity } from '../domain/category-tree.entity.ts';

@Injectable()
export class CategoryService implements CategoryServiceInterface {
  constructor(@Inject(CategoryGatewayInterface) private readonly categoryGateway: CategoryGatewayInterface) {}

  getTree(shopUuid: string): Promise<CategoryTreeEntity> {
    return this.categoryGateway.getTree(shopUuid);
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
