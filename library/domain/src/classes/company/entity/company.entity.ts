import { IsUUID, IsString, IsDateString, IsOptional } from 'class-validator';

export class CompanyEntity {
  @IsUUID()
  uuid: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
