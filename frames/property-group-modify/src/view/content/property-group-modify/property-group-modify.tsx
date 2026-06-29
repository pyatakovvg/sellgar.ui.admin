import { PropertyGroupEntity } from '@library/domain';
import { useLoaderData, useSubmit } from '@tiyn/app';

import React from 'react';
import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { PropertyGroupModifyControllerInterface } from '../../../classes/controller/property-group-modify-controller.interface.ts';
import { PROPERTY_GROUP_MODIFY_FORM_ID } from '../../../constants';

import { Fields } from './fields';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const PropertyGroupModify: React.FC = () => {
  const group = useLoaderData(PropertyGroupModifyControllerInterface) as PropertyGroupEntity | undefined;
  const submit = useSubmit(PropertyGroupModifyControllerInterface);

  const methods = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      name: group?.name ?? '',
      description: group?.description ?? '',
    },
    resolver: yupResolver(schema) as Resolver<IFormData>,
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    if (group) {
      await submit({
        uuid: group.uuid,
        version: group.version,
        name: values.name,
        description: values.description,
      });
      return;
    }

    await submit({
      name: values.name,
      description: values.description,
    });
  });

  return (
    <FormProvider {...methods}>
      <form id={PROPERTY_GROUP_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields inProcess={submit.inProcess} />
      </form>
    </FormProvider>
  );
};
