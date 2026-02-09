import { Field, Label } from '@sellgar/kit';

import React from 'react';

import { EditPrice } from '../history/current-price/edit-price';

import s from './default.module.scss';

export const Price: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Field>
        <Field.Label>
          <Label label={'Цена'} />
        </Field.Label>
        <Field.Content>
          <EditPrice value={0} />
        </Field.Content>
      </Field>
    </div>
  );
};
