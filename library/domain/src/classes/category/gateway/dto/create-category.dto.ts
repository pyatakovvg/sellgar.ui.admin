import { IsUUID, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsUUID()
  parentUuid?: string | null;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
