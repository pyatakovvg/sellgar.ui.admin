import { useLocation } from '@library/app';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { Form } from './form';

export const Filter = () => {
  const location = useLocation();

  const methods = ReactHookForm.useForm({
    defaultValues: {
      search: location.searchParams.search.search ?? undefined,
    },
  });

  return (
    <ReactHookForm.FormProvider {...methods}>
      <Form />
    </ReactHookForm.FormProvider>
  );
};
