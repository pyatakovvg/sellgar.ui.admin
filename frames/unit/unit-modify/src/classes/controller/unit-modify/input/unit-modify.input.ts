import type { CreateUnitInput } from '@library/domain';

export interface UnitModifyInput extends CreateUnitInput {
  version?: number;
}
