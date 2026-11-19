import { Expose } from 'class-transformer';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class BrandImageEntity {
  @Expose()
  @IsUUID()
  imageUuid: string;

  @Expose()
  @IsString()
  fileName: string;

  @Expose()
  @IsInt()
  sortOrder: number;
}
