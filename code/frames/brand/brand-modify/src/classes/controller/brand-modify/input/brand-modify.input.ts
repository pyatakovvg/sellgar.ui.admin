import type { CreateBrandInput } from '@library/domain';

export interface BrandModifyInput extends CreateBrandInput {
  version?: number;
}
