import { IsUUID, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsUUID()
  @IsOptional()
  parentUuid: string | null;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
