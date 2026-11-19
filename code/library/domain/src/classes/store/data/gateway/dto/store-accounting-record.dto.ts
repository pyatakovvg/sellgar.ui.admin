import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import type { StoreAccountingRecordInput } from '../input/store-accounting-record.input.ts';
import { StoreRecordClarificationDto } from './store-record-clarification.dto.ts';

export class StoreAccountingRecordDto implements StoreAccountingRecordInput {
  @Expose()
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  article?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoreRecordClarificationDto)
  clarifications?: StoreRecordClarificationDto[];
}
