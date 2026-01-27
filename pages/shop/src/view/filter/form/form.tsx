import { Field, Label, Input, Icon, Button } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import s from './default.module.scss';

export const Form = () => {
  const { control, handleSubmit } = ReactHookForm.useFormContext();

  const onSubmit = handleSubmit((values) => {
    console.log(123, values);
  });

  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <ReactHookForm.Controller
          name={'search'}
          control={control}
          render={({ field }) => (
            <Field>
              <Field.Label>
                <Label label={'Поиск по ключевым словам'} />
              </Field.Label>
              <Field.Content>
                <Input {...field} leadIcon={<Icon icon={'search-line'} />} />
              </Field.Content>
            </Field>
          )}
        />
      </div>
      <div className={s.button}>
        <Button target={'info'} onClick={() => onSubmit()}>
          Фильтр
        </Button>
      </div>
    </div>
  );
};
