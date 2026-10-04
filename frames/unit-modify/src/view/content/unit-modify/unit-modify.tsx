import { useLoaderData, useSubmit } from '@sellgar/app/react';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { UnitModifyControllerInterface } from '../../../classes/controller/unit-modify/unit-modify-controller.interface.ts';
import { UNIT_MODIFY_FORM_ID } from '../../../constants/unit-modify.constants.ts';

import { Fields } from './fields';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const UnitModify: React.FC = () => {
  const unit = useLoaderData(UnitModifyControllerInterface);
  const submit = useSubmit(UnitModifyControllerInterface);

  const methods = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      code: unit?.code ?? '',
      name: unit?.name ?? '',
      symbol: unit?.symbol ?? '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    if (unit) {
      await submit({
        version: unit.version,
        code: values.code,
        name: values.name,
        symbol: values.symbol,
      });
      return;
    }

    await submit({
      code: values.code,
      name: values.name,
      symbol: values.symbol,
    });
  });

  return (
    <FormProvider {...methods}>
      <form id={UNIT_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields inProcess={submit.inProcess} immutable={Boolean(unit)} />
      </form>
    </FormProvider>
  );
};
