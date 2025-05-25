import { FieldWrapper, Label } from '@sellgar/kit';

import React from 'react';

import { EditPrice } from '../history/current-price/edit-price';

import s from './default.module.scss';

export const Price: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <FieldWrapper>
        <FieldWrapper.Label>
          <Label label={'Цена'} />
        </FieldWrapper.Label>
        <FieldWrapper.Content>
          <EditPrice value={0} />
        </FieldWrapper.Content>
      </FieldWrapper>
    </div>
  );
};
