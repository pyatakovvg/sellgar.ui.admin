import { Select, Field, Label, Caption, Input, Button, Checkbox } from '@sellgar/kit';
import { DeleteBin2LineIcon } from '@sellgar/kit/icons';
import { ShopContactPurpose, ShopContactType } from '@library/domain';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { ShopFormInput } from '../../../../../classes/controller/shop-modify/input/shop-form.input.ts';

import s from './default.module.css';

const CONTACT_TYPE_OPTIONS = [
  { code: ShopContactType.EMAIL, name: 'Электронная почта' },
  { code: ShopContactType.PHONE, name: 'Телефон' },
];

const CONTACT_PURPOSE_OPTIONS = [
  { code: ShopContactPurpose.SUPPORT, name: 'Поддержка' },
  { code: ShopContactPurpose.CLAIMS, name: 'Претензии' },
  { code: ShopContactPurpose.RECEIPTS, name: 'Кассовые чеки' },
];

interface IProps {
  index: number;
  onRemove: () => void;
}

export const Contact: React.FC<IProps> = (props) => {
  const { control } = useFormContext<ShopFormInput>();

  return (
    <div className={s.wrapper}>
      <div className={s.remove}>
        <Button.Icon
          type={'button'}
          size={'xs'}
          style={'ghost'}
          target={'destructive'}
          aria-label={'Удалить контакт'}
          leadIcon={<DeleteBin2LineIcon />}
          onClick={props.onRemove}
        />
      </div>

      <div className={s.types}>
        <Controller
          control={control}
          name={`contacts.${props.index}.type`}
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
                  options={CONTACT_TYPE_OPTIONS}
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
          name={`contacts.${props.index}.purpose`}
          render={({ field }) => (
            <Field>
              <Field.Label>
                <Label label={'Назначение'} />
              </Field.Label>
              <Field.Content>
                <Select
                  size={'xs'}
                  optionKey={'code'}
                  optionValue={'name'}
                  options={CONTACT_PURPOSE_OPTIONS}
                  value={field.value}
                  onBlur={() => field.onBlur()}
                  onChange={(value) => field.onChange(value)}
                />
              </Field.Content>
            </Field>
          )}
        />
      </div>

      <Controller
        control={control}
        name={`contacts.${props.index}.value`}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'Значение'} />
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
        name={`contacts.${props.index}.isPublic`}
        render={({ field }) => (
          <Checkbox
            size={'sm'}
            name={field.name}
            checked={field.value}
            label={'Показывать покупателю'}
            onBlur={field.onBlur}
            onChange={(event) => field.onChange(event.currentTarget.checked)}
          />
        )}
      />
    </div>
  );
};
