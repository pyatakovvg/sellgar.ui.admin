import { ShopContactPurpose, ShopContactType } from '@library/domain';
import { ButtonLink, Typography } from '@sellgar/kit';
import { AddLineIcon, DeleteBin5LineIcon } from '@sellgar/kit/icons';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { ShopFormInput } from '../../../../classes/controller/shop-modify/input/shop-form.input.ts';
import { contactPurposeOptions, contactTypeOptions } from '../form-options.ts';
import { ArrayEmpty } from './array-empty.tsx';
import s from './array-fields.module.scss';
import { CheckboxField } from './control/checkbox-field.tsx';
import { SelectField } from './control/select-field.tsx';
import { TextField } from './control/text-field.tsx';
import { Section } from './section/section.tsx';

interface Props {
  disabled: boolean;
}

export const ContactFields: React.FC<Props> = ({ disabled }) => {
  const { control } = useFormContext<ShopFormInput>();
  const contacts = useFieldArray({ control, name: 'contacts' });

  return (
    <Section
      title={'Публичные контакты'}
      actions={
        <ButtonLink
          type={'button'}
          size={'sm'}
          leadIcon={<AddLineIcon />}
          disabled={disabled}
          onClick={() =>
            contacts.append({
              type: ShopContactType.EMAIL,
              purpose: ShopContactPurpose.SUPPORT,
              value: '',
              isPublic: true,
            })
          }
        >
          Добавить
        </ButtonLink>
      }
    >
      <div className={s.rows}>
        {contacts.fields.length === 0 && <ArrayEmpty>Публичные контакты не добавлены</ArrayEmpty>}
        {contacts.fields.map((field, index) => (
          <div className={s.row} key={field.id}>
            <div className={s.rowHeader}>
              <Typography size={'body-s'} weight={'medium'}>
                <p>Контакт {index + 1}</p>
              </Typography>
              <ButtonLink
                type={'button'}
                size={'sm'}
                leadIcon={<DeleteBin5LineIcon />}
                disabled={disabled}
                onClick={() => contacts.remove(index)}
              >
                Удалить
              </ButtonLink>
            </div>
            <SelectField
              name={`contacts.${index}.type`}
              label={'Тип'}
              options={contactTypeOptions}
              disabled={disabled}
            />
            <SelectField
              name={`contacts.${index}.purpose`}
              label={'Назначение'}
              options={contactPurposeOptions}
              disabled={disabled}
            />
            <TextField name={`contacts.${index}.value`} label={'Значение'} disabled={disabled} />
            <CheckboxField name={`contacts.${index}.isPublic`} label={'Показывать покупателю'} disabled={disabled} />
          </div>
        ))}
      </div>
    </Section>
  );
};
