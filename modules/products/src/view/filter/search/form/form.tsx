import { useController, useLoaderData } from '@sellgar/app/react';
import { Button, Caption, Field, Input } from '@sellgar/kit';
import { DeleteBin4LineIcon, SearchLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as ReactHF from 'react-hook-form';

import { SearchControllerInterface } from '../../../../classes/controller/search/search-controller.interface.ts';

import s from './default.module.scss';

export const Form: React.FC = () => {
  const { control, formState } = ReactHF.useFormContext();

  const data = useLoaderData(SearchControllerInterface);
  const controller = useController(SearchControllerInterface);

  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <ReactHF.Controller
          name={'term'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <Input
                  {...field}
                  size={'xs'}
                  aria-label={'Поиск товаров'}
                  placeholder={'Поиск по ключевым словам'}
                  leadIcon={<SearchLineIcon />}
                  tailIcon={data.term && <DeleteBin4LineIcon className={s.reset} onClick={() => controller.reset()} />}
                />
              </Field.Content>
              {!!error?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error.message} />
                </Field.Caption>
              )}
            </Field>
          )}
        />
      </div>
      <Button type={'submit'} target={'info'} size={'sm'} inProcess={formState.isSubmitting}>
        Поиск
      </Button>
    </div>
  );
};
