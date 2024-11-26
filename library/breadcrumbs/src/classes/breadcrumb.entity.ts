import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsOptional, ValidateNested } from 'class-validator';

type TBreadcrumbType = 'FUNCTION' | 'CRUMB';

class BreadcrumbParams {
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  href?: string;
}

export class BreadcrumbEntity {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  type: TBreadcrumbType;

  @Type(() => BreadcrumbParams)
  @ValidateNested()
  params: BreadcrumbParams;

  @IsBoolean()
  inProcess: boolean;
}
