import { Divider, Button } from '@sellgar/kit';
import { ShopAddressType } from '@library/domain';

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Address } from './address';

import type { ShopFormInput } from '../../../../classes/controller/shop-modify/input/shop-form.input.ts';

import s from './default.module.css';

export const Addresses: React.FC = () => {
  const { control } = useFormContext<ShopFormInput>();
  const addresses = useFieldArray({ control, name: 'addresses' });

  return (
    <div className={s.wrapper}>
      <Divider type={'label-center'} label={'Юридические сведения'} />
      <div className={s.content}>
        {addresses.fields.map((field, index) => (
          <Address key={field.id} index={index} onRemove={() => addresses.remove(index)} />
        ))}
      </div>
      <Button
        size={'sm'}
        type={'button'}
        style={'secondary'}
        onClick={() => addresses.append({ type: ShopAddressType.CLAIMS, address: '', comment: '' })}
      >
        Добавить адрес
      </Button>
    </div>
  );
};
