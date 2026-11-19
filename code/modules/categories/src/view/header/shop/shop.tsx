import * as App from '@sellgar/app/react';
import { Field, Label, Select } from '@sellgar/kit';

import React from 'react';

import { CategoryControllerInterface } from '../../../classes/controller/category/category-controller.interface.ts';

import s from './default.module.css';

export const Shop: React.FC = () => {
  const { shops, tree } = App.useLoaderData(CategoryControllerInterface);
  const submit = App.useSubmit(CategoryControllerInterface);
  const revalidate = App.useRevalidate();

  return (
    <div className={s.wrapper}>
      <Field>
        <Field.Label>
          <Label label={'Магазин'} />
        </Field.Label>
        <Field.Content>
          <Select
            size={'xs'}
            options={shops}
            optionKey={'uuid'}
            optionValue={'name'}
            value={tree?.shopUuid}
            disabled={shops.length === 0 || submit.inProcess || revalidate.inProcess}
            placeholder={'Нет магазинов'}
            isClearable={false}
            onChange={(shopUuid) => {
              if (typeof shopUuid === 'string') void submit({ shopUuid });
            }}
          />
        </Field.Content>
      </Field>
    </div>
  );
};
