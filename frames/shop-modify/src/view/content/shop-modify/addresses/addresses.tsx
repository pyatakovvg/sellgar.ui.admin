import { Divider, Field, Label, Caption, Input, Button } from '@sellgar/kit';
import { InformationLineIcon } from '@sellgar/kit/icons';
import { ShopAddressType } from '@library/domain';

import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { Address } from './address';

import s from './default.module.css';

export const Addresses = () => {
  const { control } = useFormContext();
  const addresses = useFieldArray({ control, name: 'addresses' });

  return (
    <div className={s.wrapper}>
      <Divider type={'label-center'} label={'Публичные контакты'} />
      <div className={s.content}>
        {addresses.fields.map((field, index) => (
          <Address key={'index_' + index} index={index} field={field} />
        ))}
      </div>
      <Button
        size={'xs'}
        type={'button'}
        style={'secondary'}
        onClick={() => addresses.append({ type: ShopAddressType.CLAIMS })}
      >
        Добавить адрес
      </Button>
    </div>
  );
};
