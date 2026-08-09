import * as App from '@sellgar/app';
import { Button, Field, Input, Label } from '@sellgar/kit';
import { SearchLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import s from './default.module.scss';

interface IFormValues {
  search: string;
}

export const Search: React.FC = () => {
  const location = App.useLocation();
  const navigate = App.useNavigate();
  const searchParam = location.searchParams.search;
  const search = typeof searchParam === 'string' ? searchParam : '';
  const form = ReactHookForm.useForm<IFormValues>({
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
        <ReactHookForm.Controller
          name={'search'}
          control={form.control}
          render={({ field }) => (
            <Field>
              <Field.Label>
                <Label label={'Поиск по ключевым словам'} />
              </Field.Label>
              <Field.Content>
                <Input {...field} leadIcon={<SearchLineIcon />} />
              </Field.Content>
            </Field>
          )}
        />
      </div>
      <div className={s.button}>
        <Button type={'submit'} target={'info'}>
          Фильтр
        </Button>
      </div>
    </form>
  );
};
