import { Expose, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { ProductTypeEntity, PropertyResultEntity } from '@library/domain';

export class TemplateModifyResultEntity {
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductTypeEntity)
  template?: ProductTypeEntity;

  @Expose()
  @ValidateNested()
  @Type(() => PropertyResultEntity)
  properties: PropertyResultEntity;
}
