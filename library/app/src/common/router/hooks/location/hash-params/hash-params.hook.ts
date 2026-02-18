import React from 'react';
import { validateSync } from 'class-validator';
import { plainToInstance, instanceToPlain, ClassConstructor } from 'class-transformer';

import { useUrlChange } from './url-change.hook.ts';
import { parseHashToObject } from '../../../../application/classes/services/location/utils/hash.utils.ts';

export const createHashFactorySync = <T extends object>(Target: ClassConstructor<T>) => {
  return (hash: Record<string, any>) => {
    const result = plainToInstance(Target, hash, {
      exposeUnsetFields: false,
      exposeDefaultValues: false,
      excludeExtraneousValues: true,
    });

    const errors = validateSync(result, {
      forbidUnknownValues: false,
      skipMissingProperties: true,
      skipUndefinedProperties: true,
      skipNullProperties: true,
      whitelist: true,
    });

    if (errors.length > 0) {
      throw errors;
    }
    return instanceToPlain(result, {
      strategy: 'excludeAll',
      exposeUnsetFields: false,
      exposeDefaultValues: false,
      excludeExtraneousValues: false,
    }) as T;
  };
};

export const useHashParams = () => {
  const [hash, setHash] = React.useState(() => parseHashToObject(location.hash));

  useUrlChange((location: any) => {
    setHash(parseHashToObject(location.hash));
  }, []);

  const plainToObject = React.useCallback(
    <T extends object>(Target: ClassConstructor<T>) => {
      return createHashFactorySync(Target)(hash);
    },
    [hash],
  );

  return { hash, plainToObject };
};
