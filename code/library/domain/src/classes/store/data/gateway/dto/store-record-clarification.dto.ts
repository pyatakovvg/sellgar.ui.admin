import { Expose, Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

import type { StoreRecordClarificationInput } from '../input/store-record-clarification.input.ts';

export class StoreRecordClarificationDto implements StoreRecordClarificationInput {
  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1)
  @MaxLength(4096)
  value: string;
}
