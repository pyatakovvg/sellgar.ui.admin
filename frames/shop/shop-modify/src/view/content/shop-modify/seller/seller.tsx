import { Divider, Select, Field, Label, Caption } from '@sellgar/kit';
import { ShopLegalForm } from '@library/domain';

import React from 'react';
import { Controller, useFormContext, useFormState, useWatch } from 'react-hook-form';

import type { ShopFormInput } from '../../../../classes/controller/shop-modify/input/shop-form.input.ts';

import { Legal } from './legal';
import { General } from './general';

import s from './default.module.css';

const LEGAL_FORM_OPTIONS = [
  { code: ShopLegalForm.LEGAL_ENTITY, name: 'Юридическое лицо' },
  { code: ShopLegalForm.INDIVIDUAL_ENTREPRENEUR, name: 'Индивидуальный предприниматель' },
];

export const Seller: React.FC = () => {
  const { control } = useFormContext<ShopFormInput>();
  const { isSubmitting } = useFormState({ control });
  const legalForm = useWatch({ control, name: 'legalForm' });

  return (
    <div className={s.wrapper}>
      <Divider type={'label-center'} label={'Юридические сведения'} />
      <div className={s.content}>
        <Controller
          control={control}
          name={'legalForm'}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Label>
                <Label label={'Тип продавца'} required={true} />
              </Field.Label>
              <Field.Content>
                <Select
                  size={'xs'}
                  optionKey={'code'}
                  optionValue={'name'}
                  options={LEGAL_FORM_OPTIONS}
                  value={field.value}
                  disabled={isSubmitting}
                  target={error?.message ? 'destructive' : undefined}
                  onBlur={() => field.onBlur()}
                  onChange={(value) => field.onChange(value)}
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
      {legalForm === ShopLegalForm.LEGAL_ENTITY ? <Legal /> : <General />}
    </div>
  );
};
