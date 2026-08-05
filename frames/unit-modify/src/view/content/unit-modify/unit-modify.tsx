import { UnitEntity } from '@library/domain';
import { useLoaderData, useSubmit } from '@sellgar/app';

import React from 'react';
import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { UnitModifyControllerInterface } from '../../../classes/controller/unit-modify-controller.interface.ts';
import { UNIT_MODIFY_FORM_ID } from '../../../constants';

import { Fields } from './fields';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const UnitModify: React.FC = () => {
  const unit = useLoaderData(UnitModifyControllerInterface) as UnitEntity | undefined;
  const submit = useSubmit(UnitModifyControllerInterface);

  const methods = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      code: unit?.code ?? '',
      name: unit?.name ?? '',
      description: unit?.description ?? '',
    },
    resolver: yupResolver(schema) as Resolver<IFormData>,
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    if (unit) {
      await submit({
        version: unit.version,
        code: values.code,
        name: values.name,
        description: values.description,
      });
      return;
    }

    await submit({
      code: values.code,
      name: values.name,
      description: values.description,
    });
  });

  return (
    <FormProvider {...methods}>
      <form id={UNIT_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields inProcess={submit.inProcess} />
      </form>
    </FormProvider>
  );
};
