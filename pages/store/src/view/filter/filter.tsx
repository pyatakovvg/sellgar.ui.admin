import * as App from '@sellgar/app';
import { Button, Field, Input } from '@sellgar/kit';
import { SearchLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { FilterControllerInterface } from '../../classes/controller/filter/filter-controller.interface.ts';
import type { FilterInput } from '../../classes/controller/filter/input/filter.input.ts';

import s from './default.module.scss';

export const Filter: React.FC = () => {
  const controller = App.useController(FilterControllerInterface);
  const filter = App.useLoaderData(FilterControllerInterface);
  const form = ReactHookForm.useForm<FilterInput>({
    values: filter,
  });
  const handleSubmit = form.handleSubmit((input) => controller.apply(input));

  return (
    <form className={s.wrapper} onSubmit={handleSubmit}>
      <div className={s.field}>
        <Field>
          <Field.Content>
            <Input
              {...form.register('search')}
              size={'xs'}
              placeholder={'Поиск по ключевым словам'}
              leadIcon={<SearchLineIcon />}
            />
          </Field.Content>
        </Field>
      </div>
      <div className={s.button}>
        <Button type={'submit'} target={'info'} size={'sm'}>
          Фильтр
        </Button>
      </div>
    </form>
  );
};
