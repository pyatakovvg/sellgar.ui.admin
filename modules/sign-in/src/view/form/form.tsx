import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSubmit } from '@sellgar/app/react';

import { SignInControllerInterface } from '../../classes/controller/sign-in/sign-in-controller.interface.ts';
import type { SignInInput } from '../../classes/controller/sign-in/input/sign-in.input.ts';

import { Actions } from './actions';
import { Fields } from './fields';
import { schema } from './schema';

import s from './default.module.scss';

export const Form: React.FC = () => {
  const submit = useSubmit(SignInControllerInterface);
  const form = ReactHookForm.useForm<SignInInput>({
    resolver: yupResolver(schema, { abortEarly: false }),
  });
  const handleSubmit = form.handleSubmit(submit);

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
