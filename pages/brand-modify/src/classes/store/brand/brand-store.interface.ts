import { HttpException, BrandEntity } from '@library/domain';

import { ValidationError } from 'class-validator';

export abstract class BrandStoreInterface {
  abstract data: BrandEntity | null;
  abstract error: HttpException | null;
  abstract validationErrors: ValidationError[];

  abstract setData(data: BrandEntity | null): void;
  abstract setError(error: HttpException | null): void;
  abstract setValidationError(error: ValidationError[]): void;
}
