import { ShopAddressType } from '@library/domain';
import { ButtonLink, Typography } from '@sellgar/kit';
import { AddLineIcon, DeleteBin5LineIcon } from '@sellgar/kit/icons';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { ShopFormInput } from '../../../../classes/controller/shop-modify/input/shop-form.input.ts';
import { addressTypeOptions } from '../form-options.ts';
import { ArrayEmpty } from './array-empty.tsx';
import s from './array-fields.module.scss';
import { SelectField } from './control/select-field.tsx';
import { TextField } from './control/text-field.tsx';
import { Section } from './section/section.tsx';

interface Props {
  disabled: boolean;
}

export const AddressFields: React.FC<Props> = ({ disabled }) => {
  const { control } = useFormContext<ShopFormInput>();
  const addresses = useFieldArray({ control, name: 'addresses' });

  return (
    <Section
      title={'Адреса'}
      actions={
        <ButtonLink
          type={'button'}
          size={'sm'}
          leadIcon={<AddLineIcon />}
          disabled={disabled}
          onClick={() => addresses.append({ type: ShopAddressType.CLAIMS, address: '', comment: '' })}
        >
          Добавить
        </ButtonLink>
      }
    >
      <div className={s.rows}>
        {addresses.fields.length === 0 && <ArrayEmpty>Адреса не добавлены</ArrayEmpty>}
        {addresses.fields.map((field, index) => (
          <div className={s.row} key={field.id}>
            <div className={s.rowHeader}>
              <Typography size={'body-s'} weight={'medium'}>
                <p>Адрес {index + 1}</p>
              </Typography>
              <ButtonLink
                type={'button'}
                size={'sm'}
                leadIcon={<DeleteBin5LineIcon />}
                disabled={disabled}
                onClick={() => addresses.remove(index)}
              >
                Удалить
              </ButtonLink>
            </div>
            <SelectField
              name={`addresses.${index}.type`}
              label={'Назначение'}
              options={addressTypeOptions}
              disabled={disabled}
            />
            <TextField name={`addresses.${index}.address`} label={'Адрес'} disabled={disabled} multiline={true} />
            <TextField name={`addresses.${index}.comment`} label={'Комментарий'} disabled={disabled} multiline={true} />
          </div>
        ))}
      </div>
    </Section>
  );
};
