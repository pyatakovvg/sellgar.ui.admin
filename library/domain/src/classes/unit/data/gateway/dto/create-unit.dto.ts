import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import type { CreateUnitInput } from '../input/create-unit.input.ts';

export class CreateUnitDto implements CreateUnitInput {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;
}
