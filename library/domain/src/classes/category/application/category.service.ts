import { Inject, Injectable } from '@tiyn/app';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategoryDto } from './dto/update-category.dto.ts';

import { CategoryServiceInterface } from './category-service.interface.ts';
import { CategoryGatewayInterface } from '../gateway/category-gateway.interface.ts';

import { CategoryEntity, CategoryResultEntity } from '../domain/category.entity.ts';

@Injectable()
export class CategoryService implements CategoryServiceInterface {
  constructor(@Inject(CategoryGatewayInterface) private readonly categoryGateway: CategoryGatewayInterface) {}

  async findAll(): Promise<CategoryResultEntity> {
    return await this.categoryGateway.findAll();
  }

  async findByUuid(uuid: string): Promise<CategoryEntity> {
    return await this.categoryGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const dtoInstance = plainToInstance(UpdateCategoryDto, this.createValidationDto(dto));

    await validateOrReject(dtoInstance);

    return await this.categoryGateway.update(uuid, dto);
  }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const dtoInstance = plainToInstance(CreateCategoryDto, this.createValidationDto(dto));

    await validateOrReject(dtoInstance);

    return await this.categoryGateway.create(dto);
  }

  private createValidationDto<T extends CreateCategoryDto | UpdateCategoryDto>(dto: T): T {
    if (!dto.image) {
      return dto;
    }

    const { file: _file, ...image } = dto.image;

    return {
      ...dto,
      image,
    };
  }
}
