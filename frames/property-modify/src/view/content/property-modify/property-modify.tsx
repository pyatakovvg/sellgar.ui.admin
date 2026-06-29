import { PropertyEntity } from '@library/domain';
import { useLoaderData, useSubmit } from '@tiyn/app';

import React from 'react';
import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { PropertyModifyControllerInterface } from '../../../classes/controller/property-modify-controller.interface.ts';
import { PROPERTY_MODIFY_FORM_ID } from '../../../constants';

import { Fields } from './fields';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const PropertyModify: React.FC = () => {
  const property = useLoaderData(PropertyModifyControllerInterface) as PropertyEntity | undefined;
  const submit = useSubmit(PropertyModifyControllerInterface);

  const methods = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      groupUuid: property?.groupUuid ?? '',
      unitUuid: property?.unitUuid ?? undefined,
      code: property?.code ?? '',
      name: property?.name ?? '',
      type: property?.type ?? 'TEXT',
      description: property?.description ?? '',
    },
    resolver: yupResolver(schema) as Resolver<IFormData>,
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    const unitUuid = values.unitUuid || undefined;

    if (property) {
      await submit({
        uuid: property.uuid,
        version: property.version,
        groupUuid: values.groupUuid,
        unitUuid,
        code: values.code,
        name: values.name,
        type: values.type,
        description: values.description,
      });
      return;
    }

    await submit({
      groupUuid: values.groupUuid,
      unitUuid,
      code: values.code,
      name: values.name,
      type: values.type,
      description: values.description,
    });
  });

  return (
    <FormProvider {...methods}>
      <form id={PROPERTY_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields inProcess={submit.inProcess} />
      </form>
    </FormProvider>
  );
};
