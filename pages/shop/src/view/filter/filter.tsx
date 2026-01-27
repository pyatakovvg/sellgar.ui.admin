import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { Form } from './form';

export const Filter = () => {
  const methods = ReactHookForm.useForm({
    defaultValues: {
      search: '',
    },
  });

  return (
    <ReactHookForm.FormProvider {...methods}>
      <Form />
    </ReactHookForm.FormProvider>
  );
};
