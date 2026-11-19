import { Select, Field, Label, Caption, Input, Button, Textarea } from '@sellgar/kit';
import { DeleteBin2LineIcon } from '@sellgar/kit/icons';
import { ShopAddressType } from '@library/domain';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { ShopFormInput } from '../../../../../classes/controller/shop-modify/input/shop-form.input.ts';

import s from './default.module.css';

const ADDRESS_TYPE_OPTIONS = [
  { code: ShopAddressType.CLAIMS, name: 'Претензии' },
  { code: ShopAddressType.RETURNS, name: 'Возвраты' },
  { code: ShopAddressType.PICKUP, name: 'Самовывоз' },
];

interface IProps {
  index: number;
  onRemove: () => void;
}

export const Address: React.FC<IProps> = (props) => {
  const { control } = useFormContext<ShopFormInput>();

  return (
    <div className={s.wrapper}>
      <div className={s.remove}>
        <Button.Icon
          type={'button'}
          size={'xs'}
          style={'tertiary'}
          target={'destructive'}
          aria-label={'Удалить адрес'}
          leadIcon={<DeleteBin2LineIcon />}
          onClick={props.onRemove}
        />
      </div>

      <Controller
        control={control}
        name={`addresses.${props.index}.type`}
        render={({ field }) => (
          <Field>
            <Field.Label>
              <Label label={'Тип'} />
            </Field.Label>
            <Field.Content>
              <Select
                size={'xs'}
                optionKey={'code'}
                optionValue={'name'}
                options={ADDRESS_TYPE_OPTIONS}
                value={field.value}
                onBlur={() => field.onBlur()}
                onChange={(value) => field.onChange(value)}
              />
            </Field.Content>
          </Field>
        )}
      />

      <Controller
        control={control}
        name={`addresses.${props.index}.address`}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'Адрес'} />
            </Field.Label>
            <Field.Content>
              <Input
                {...field}
                size={'xs'}
                value={typeof field.value === 'string' ? field.value : ''}
                target={error?.message ? 'destructive' : undefined}
                placeholder={''}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name={`addresses.${props.index}.comment`}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'Информация'} />
            </Field.Label>
            <Field.Content>
              <Textarea
                {...field}
                value={typeof field.value === 'string' ? field.value : ''}
                target={error?.message ? 'destructive' : undefined}
                placeholder={''}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />
    </div>
  );
};
