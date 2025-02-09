import { HttpException } from '@library/domain';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

export abstract class FormStoreInterface {
  abstract inProcess: boolean;
  abstract error: HttpException | null;

  abstract setProcess(state: boolean): void;
  abstract setError(error: HttpException | null): void;

  abstract create(dto: CreateProductDto): Promise<UpdateProductDto | null>;
  abstract update(uuid: string, dto: UpdateProductDto): Promise<UpdateProductDto | null>;
  abstract getByUuid(uuid: string): Promise<UpdateProductDto | null>;
}
