import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { UpdateCategoryDto } from './dto/update-category.dto.ts';

import { CategoryGatewayInterface } from './category-gateway.interface.ts';

import { CategoryEntity, CategoryResultEntity } from '../category.entity.ts';

@injectable()
export class CategoryGateway implements CategoryGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async update(uuid: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const result = await this.httpClient.patch(
      this.config.get('GATEWAY_API') + '/v2/categories/' + uuid,
      this.createCategoryFormData(updateCategoryDto),
    );
    const resultInstance = plainToInstance(CategoryEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const result = await this.httpClient.post(
      this.config.get('GATEWAY_API') + '/v2/categories',
      this.createCategoryFormData(createCategoryDto),
    );
    const resultInstance = plainToInstance(CategoryEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string): Promise<CategoryEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/categories/' + uuid);
    const resultInstance = plainToInstance(CategoryEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findAll(): Promise<CategoryResultEntity> {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/categories');
    const resultInstance = plainToInstance(CategoryResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  private createCategoryFormData(dto: CreateCategoryDto | UpdateCategoryDto) {
    const formData = new FormData();
    const image = dto.image?.file
      ? {
          localId: dto.image.localId ?? globalThis.crypto.randomUUID(),
          fileName: dto.image.fileName ?? dto.image.file.name,
          alt: dto.image.alt ?? null,
        }
      : dto.image
        ? {
            imageUuid: dto.image.imageUuid,
            fileName: dto.image.fileName,
            alt: dto.image.alt ?? null,
          }
        : null;

    if (dto.image?.file && image?.localId) {
      formData.append(`image:${image.localId}`, dto.image.file, dto.image.file.name);
    }

    formData.append(
      'payload',
      JSON.stringify({
        ...dto,
        image,
      }),
    );

    return formData;
  }
}
