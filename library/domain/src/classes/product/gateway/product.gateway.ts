import { Inject, Injectable } from '@tiyn/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { ProductGatewayInterface } from './product-gateway.interface.ts';

import { ProductEntity, ProductResultEntity } from '../domain/product.entity.ts';

@Injectable()
export class ProductGateway implements ProductGatewayInterface {
  constructor(
    @Inject(ConfigInterface) private readonly config: ConfigInterface,
    @Inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  async findAll() {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/products');
    const resultInstance = plainToInstance(ProductResultEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async findByUuid(uuid: string) {
    const result = await this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/products/' + uuid);
    const resultInstance = plainToInstance(ProductEntity, result, {
      strategy: 'excludeAll',
    });

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async create(dto: CreateProductDto) {
    const result = await this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/products', this.createProductFormData(dto));
    const resultInstance = plainToInstance(ProductEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  async update(uuid: string, dto: UpdateProductDto) {
    const result = await this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/products/' + uuid, this.createProductFormData(dto));
    const resultInstance = plainToInstance(ProductEntity, result);

    await validateOrReject(resultInstance);

    return resultInstance;
  }

  private createProductFormData(dto: CreateProductDto | UpdateProductDto) {
    const formData = new FormData();
    const payload = {
      ...dto,
      variants: dto.variants.map((variant) => ({
        ...variant,
        images: variant.images?.map((image, order) => {
          if (image.file) {
            const localId = image.localId ?? globalThis.crypto.randomUUID();

            formData.append(`gallery:${localId}`, image.file, image.file.name);

            return {
              localId,
              fileName: image.fileName ?? image.file.name,
              order,
              alt: image.alt ?? null,
            };
          }

          return {
            uuid: image.uuid,
            imageUuid: image.imageUuid,
            fileName: image.fileName,
            order,
            alt: image.alt ?? null,
          };
        }),
      })),
    };

    formData.append('payload', JSON.stringify(payload));

    return formData;
  }
}
