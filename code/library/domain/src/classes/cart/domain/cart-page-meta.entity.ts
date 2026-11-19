import { Expose } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class CartPageMetaEntity {
  @Expose()
  @IsInt()
  @Min(0)
  totalRows: number;

  @Expose()
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @Expose()
  @IsInt()
  @Min(0)
  offset: number;
}
