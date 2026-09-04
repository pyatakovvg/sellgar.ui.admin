import * as App from '@sellgar/app/react';
import { Button, Field, Input, Label } from '@sellgar/kit';
import { SearchLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as RHF from 'react-hook-form';

import { FilterControllerInterface } from '../../classes/controller/filter/filter-controller.interface.ts';

import s from './default.module.scss';

export const Filter: React.FC = () => {
  const submit = App.useSubmit(FilterControllerInterface);
  const filter = App.useLoaderData(FilterControllerInterface);
  const form = RHF.useForm({ values: filter });
  const handleSearch = form.handleSubmit(submit);

  return (
    <form className={s.wrapper} onSubmit={handleSearch}>
      <div className={s.field}>
        <Field>
          <Field.Label>
            <Label label={'Поиск по ключевым словам'} />
          </Field.Label>
          <Field.Content>
            <Input {...form.register('search')} leadIcon={<SearchLineIcon />} />
          </Field.Content>
        </Field>
      </div>
      <div className={s.button}>
        <Button type={'submit'} target={'info'}>
          Фильтр
        </Button>
      </div>
    </form>
  );
};
