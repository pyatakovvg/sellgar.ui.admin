import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSignInRequest } from '../../requests/sign-in.request';

import { Actions } from './actions';
import { Fields } from './fields';
import { schema, type TFormValues } from './schema';

import s from './default.module.scss';

export const Form: React.FC = () => {
  const signInRequest = useSignInRequest();
  const form = ReactHookForm.useForm<TFormValues>({
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await signInRequest(values.login, values.password);
  });

  return (
    <ReactHookForm.FormProvider {...form}>
      <form className={s.wrapper} noValidate={true} onSubmit={handleSubmit}>
        <div className={s.fields}>
          <Fields />
        </div>
        <div className={s.actions}>
          <Actions />
        </div>
      </form>
    </ReactHookForm.FormProvider>
  );
};
