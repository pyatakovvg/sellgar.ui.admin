import { CreateProductStoreDto } from './create-product-store.dto.ts';

export class UpdateProductStoreDto extends CreateProductStoreDto {
  uuid: string;
}
