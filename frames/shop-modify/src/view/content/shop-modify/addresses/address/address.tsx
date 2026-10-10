import { Divider, Field, Label, Caption, Input, Button } from '@sellgar/kit';
import { InformationLineIcon } from '@sellgar/kit/icons';
import { ShopAddressEntity } from '@library/domain';

import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import s from './default.module.css';

interface IProps {
  index: number;
  field: ShopAddressEntity;
}

export const Address: React.FC<IProps> = () => {
  const { control } = useFormContext();
  const addresses = useFieldArray({ control, name: 'addresses' });

  return (
    <div className={s.wrapper}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
