import { IsNumber, IsOptional, IsUUID } from 'class-validator';

import { CreateDto } from './create.dto.ts';

export class UpdateDto extends CreateDto {
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsUUID()
  offerUuid?: string;

  @IsNumber()
  expectedVersion: number;
}
