import { useNavigate } from '@library/app';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { Form } from './form';

export const Filter = () => {
  const navigate = useNavigate();

  const methods = ReactHookForm.useForm({
    defaultValues: {
      search: navigate.query.getParam('search') ?? undefined,
    },
  });

  return (
    <ReactHookForm.FormProvider {...methods}>
      <Form />
    </ReactHookForm.FormProvider>
  );
};
