import { IsUUID, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsUUID()
  @IsOptional()
  parentUuid?: string;

  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
