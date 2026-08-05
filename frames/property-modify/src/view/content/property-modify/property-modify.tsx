import { PropertyEntity } from '@library/domain';
import { useLoaderData, useSubmit } from '@sellgar/app';

import React from 'react';
import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { PropertyModifyControllerInterface } from '../../../classes/controller/property-modify-controller.interface.ts';
import { PROPERTY_MODIFY_FORM_ID } from '../../../constants';

import { Fields } from './fields';
import { createDefaultValues, createPropertyPayload } from './form-values.ts';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const PropertyModify: React.FC = () => {
  const property = useLoaderData(PropertyModifyControllerInterface) as PropertyEntity | undefined;
  const submit = useSubmit(PropertyModifyControllerInterface);

  const methods = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: createDefaultValues(property),
    resolver: yupResolver(schema) as Resolver<IFormData>,
  });

  React.useEffect(() => {
    methods.reset(createDefaultValues(property));
  }, [methods, property]);

  const handleSubmit = methods.handleSubmit(async (values) => {
    await submit(createPropertyPayload(values, property));
  });

  return (
    <FormProvider {...methods}>
      <form id={PROPERTY_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields inProcess={submit.inProcess} />
      </form>
    </FormProvider>
  );
};
