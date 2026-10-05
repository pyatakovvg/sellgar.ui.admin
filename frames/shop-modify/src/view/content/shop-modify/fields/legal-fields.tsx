import { ShopLegalForm } from '@library/domain';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { ShopFormInput } from '../../../../classes/controller/shop-modify/input/shop-form.input.ts';
import { legalFormOptions } from '../form-options.ts';
import { SelectField } from './control/select-field.tsx';
import { TextField } from './control/text-field.tsx';
import { Section } from './section/section.tsx';

interface Props {
  disabled: boolean;
}

export const LegalFields: React.FC<Props> = ({ disabled }) => {
  const { control } = useFormContext<ShopFormInput>();
  const legalForm = useWatch({ control, name: 'legalForm' });

  return (
    <Section title={'Юридические сведения'}>
      <SelectField name={'legalForm'} label={'Тип продавца'} options={legalFormOptions} disabled={disabled} />
      {legalForm === ShopLegalForm.LEGAL_ENTITY ? (
        <>
          <TextField name={'legalName'} label={'Юридическое наименование'} disabled={disabled} />
          <TextField name={'kpp'} label={'КПП'} disabled={disabled} />
          <TextField name={'ogrn'} label={'ОГРН'} disabled={disabled} />
        </>
      ) : (
        <>
          <TextField name={'entrepreneurFullName'} label={'ФИО предпринимателя'} disabled={disabled} />
          <TextField name={'ogrnip'} label={'ОГРНИП'} disabled={disabled} />
          <TextField name={'registrationAuthority'} label={'Регистрирующий орган'} disabled={disabled} />
        </>
      )}
      <TextField name={'inn'} label={'ИНН'} disabled={disabled} />
      <TextField
        name={'legalAddress'}
        label={legalForm === ShopLegalForm.LEGAL_ENTITY ? 'Юридический адрес' : 'Адрес регистрации'}
        disabled={disabled}
        multiline={true}
      />
      <TextField name={'actualLocation'} label={'Фактический адрес'} disabled={disabled} multiline={true} />
      <TextField name={'email'} label={'Электронная почта'} disabled={disabled} />
      <TextField name={'phone'} label={'Телефон'} disabled={disabled} />
    </Section>
  );
};
