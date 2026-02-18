import { useLocation, useNavigate } from '@library/app';
import { Button, Icon } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { Form } from './form';

import s from './default.module.scss';

export const Filter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const methods = ReactHookForm.useForm({
    defaultValues: {
      search: location.searchParams.search.search ?? undefined,
    },
  });

  return (
    <ReactHookForm.FormProvider {...methods}>
      <div className={s.wrapper}>
        <Form />
        <Button leadIcon={<Icon icon={'add-fill'} />} size={'sm'} onClick={() => navigate.hashParams({ brand: {} })}>
          Добавить бренд
        </Button>
      </div>
    </ReactHookForm.FormProvider>
  );
};
