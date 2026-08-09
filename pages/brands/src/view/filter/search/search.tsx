import * as App from '@sellgar/app';
import { Button, Field, Input } from '@sellgar/kit';
import { SearchLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as RHF from 'react-hook-form';

import s from './default.module.scss';

interface IFormValues {
  search?: string;
}

export const Search: React.FC = () => {
  const location = App.useLocation();
  const navigate = App.useNavigate();
  const searchParam = location.searchParams.search;
  const search = typeof searchParam === 'string' ? searchParam : undefined;
  const form = RHF.useForm<IFormValues>({
    defaultValues: {
      search,
    },
  });

  const handleSearch = form.handleSubmit((values) => {
    void navigate.searchParams({ search: values.search }, { merge: true });
  });

  return (
    <form className={s.wrapper} onSubmit={handleSearch}>
      <div className={s.field}>
        <RHF.Controller
          name={'search'}
          control={form.control}
          render={({ field }) => (
            <Field>
              <Field.Content>
                <Input {...field} size={'xs'} placeholder={'Поиск по ключевым словам'} leadIcon={<SearchLineIcon />} />
              </Field.Content>
            </Field>
          )}
        />
      </div>
      <div className={s.button}>
        <Button type={'submit'} size={'sm'}>
          Найти
        </Button>
      </div>
    </form>
  );
};
