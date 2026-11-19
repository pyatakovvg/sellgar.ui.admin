import type { CreateUnitInput, UpdateUnitInput } from '@library/domain';
import type { UnitModifyInput } from '../input/unit-modify.input.ts';

export class UnitModifyMapper {
  static create(input: UnitModifyInput): CreateUnitInput {
    return { code: input.code, name: input.name, symbol: input.symbol, description: input.description };
  }

  static update(input: UnitModifyInput): UpdateUnitInput {
    if (input.version === undefined) throw new Error('Не передана версия размерности.');
    return { version: input.version, name: input.name, symbol: input.symbol, description: input.description };
  }
}
