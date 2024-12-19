import { IsUUID, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsUUID()
  parentUuid?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
