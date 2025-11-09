import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreatePropertyDto {
  @IsUUID()
  groupUuid: string;

  @IsUUID()
  @IsOptional()
  unitUuid?: string;

  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  description: string;
}
