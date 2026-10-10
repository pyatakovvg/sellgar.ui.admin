import * as App from '@sellgar/app/react';
import { Button, Field, Input } from '@sellgar/kit';
import { SearchLineIcon, DeleteBin4LineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { StoreControllerInterface } from '../../classes/controller/store/store-controller.interface.ts';
import { FilterControllerInterface } from '../../classes/controller/filter/filter-controller.interface.ts';

import s from './default.module.scss';

export const Filter: React.FC = () => {
  const revalidate = App.useRevalidate(StoreControllerInterface);
  const controller = App.useController(FilterControllerInterface);
  const submit = App.useSubmit(FilterControllerInterface);

  const filter = App.useLoaderData(FilterControllerInterface);

  const form = ReactHookForm.useForm({
    values: filter,
  });
  const handleSubmit = form.handleSubmit(submit);

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
              tailIcon={<DeleteBin4LineIcon onClick={() => controller.reset()} />}
            />
          </Field.Content>
        </Field>
      </div>
      <div className={s.button}>
        <Button type={'submit'} target={'info'} size={'sm'} inProcess={submit.inProcess}>
          Фильтр
        </Button>
        <Button type={'button'} size={'sm'} onClick={() => revalidate()} inProcess={revalidate.inProcess}>
          Обновить
        </Button>
      </div>
    </form>
  );
};
