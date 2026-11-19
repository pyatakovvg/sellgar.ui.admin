import { CreateBrandDto } from '../dto/create-brand.dto.ts';
import { UpdateBrandDto } from '../dto/update-brand.dto.ts';

export abstract class BrandFormDataFactoryInterface {
  abstract create(dto: CreateBrandDto | UpdateBrandDto): FormData;
}
