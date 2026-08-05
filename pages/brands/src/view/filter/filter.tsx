import { BrandModifyFrame } from '@frame/brand-modify';
import { useFrame, useLocation } from '@sellgar/app';
import { Button, Icon } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { Form } from './form';

import s from './default.module.scss';

export const Filter = () => {
  const location = useLocation();
  const brandModifyFrame = useFrame(BrandModifyFrame);

  const methods = ReactHookForm.useForm({
    defaultValues: {
      search: (location.searchParams.search as { search?: string } | undefined)?.search ?? undefined,
    },
  });

  return (
    <ReactHookForm.FormProvider {...methods}>
      <div className={s.wrapper}>
        <Form />
        <Button leadIcon={<Icon icon={'add-fill'} />} size={'sm'} onClick={() => void brandModifyFrame.open({})}>
          Добавить бренд
        </Button>
      </div>
    </ReactHookForm.FormProvider>
  );
};
