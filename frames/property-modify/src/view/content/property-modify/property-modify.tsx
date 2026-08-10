import { useLoaderData, useSubmit } from '@sellgar/app';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { PropertyModifyControllerInterface } from '../../../classes/controller/property-modify/property-modify-controller.interface.ts';
import { PROPERTY_MODIFY_FORM_ID } from '../../../constants/property-modify.constants.ts';

import { Fields } from './fields';
import { createDefaultValues, createPropertyPayload } from './form-values.ts';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const PropertyModify: React.FC = () => {
  const property = useLoaderData(PropertyModifyControllerInterface);
  const submit = useSubmit(PropertyModifyControllerInterface);

  const methods = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: createDefaultValues(property),
    resolver: yupResolver(schema),
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
