import { ButtonLink } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import { useVariants } from '../../hooks/use-variants.hook.ts';

export const Create: React.FC = () => {
  const variants = useVariants();

  return (
    <ButtonLink type={'button'} size={'sm'} target={'info'} leadIcon={<AddLineIcon />} onClick={variants.add}>
      Добавить вариант
    </ButtonLink>
  );
};
