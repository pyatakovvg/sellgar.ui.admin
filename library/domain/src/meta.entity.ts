import { IsNumber, IsOptional } from 'class-validator';

export class MetaEntity {
  @IsNumber()
  @IsOptional()
  totalRows: number;
}
