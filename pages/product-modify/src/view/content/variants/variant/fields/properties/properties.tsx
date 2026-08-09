import React from 'react';

import { Properties as PropertiesField } from '../../../../properties';
import { useVariant } from '../../hooks/use-variant.hook.ts';

export const Properties: React.FC = () => {
  const variant = useVariant();

  return (
    <PropertiesField
      name={`variants.${variant.index}.properties`}
      label={'Свойства варианта'}
      scope={'variant'}
      variantIndex={variant.index}
    />
  );
};
