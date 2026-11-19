import { Divider, Button } from '@sellgar/kit';
import { ShopContactPurpose, ShopContactType } from '@library/domain';

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { ShopFormInput } from '../../../../classes/controller/shop-modify/input/shop-form.input.ts';

import { Contact } from './contact';

import s from './default.module.css';

export const Contacts: React.FC = () => {
  const { control } = useFormContext<ShopFormInput>();
  const contacts = useFieldArray({ control, name: 'contacts' });

  return (
    <div className={s.wrapper}>
      <Divider type={'label-center'} label={'Публичные контакты'} />
      <div className={s.content}>
        {contacts.fields.map((field, index) => (
          <Contact key={field.id} index={index} onRemove={() => contacts.remove(index)} />
        ))}
      </div>
      <Button
        size={'sm'}
        type={'button'}
        style={'secondary'}
        onClick={() =>
          contacts.append({
            type: ShopContactType.EMAIL,
            purpose: ShopContactPurpose.SUPPORT,
            value: '',
            isPublic: true,
          })
        }
      >
        Добавить контакт
      </Button>
    </div>
  );
};
