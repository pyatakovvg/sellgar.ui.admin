import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';

export abstract class BrandGatewayInterface {
  abstract findAll(): Promise<any>;
  abstract findByUuid(uuid: string): Promise<any>;
  abstract create(createCategoryDto: CreateBrandDto): Promise<any>;
  abstract update(uuid: string, updateCategoryDto: UpdateBrandDto): Promise<any>;
}
