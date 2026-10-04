import * as App from '@sellgar/app/react';
import { Caption, Field, Input, Label } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TemplateModifyControllerInterface } from '../../classes/controller/template-modify-controller.interface.ts';
import type { TemplateFormInput } from '../../classes/controller/input/template-form.input.ts';
import { TemplateFields } from './template-fields.tsx';

import s from './template-form.module.scss';

interface TemplateFormProps {
  readonly inProcess: boolean;
}

export const TemplateForm: React.FC<TemplateFormProps> = ({ inProcess }) => {
  const { properties } = App.useLoaderData(TemplateModifyControllerInterface);
  const { control } = useFormContext<TemplateFormInput>();

  return (
    <div className={s.wrapper}>
      <section className={s.section}>
        <h3 className={s.title}>Основная информация</h3>
        <Controller
          name={'name'}
          control={control}
          disabled={inProcess}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Label>
                <Label label={'Название'} />
              </Field.Label>
              <Field.Content>
                <Input
                  {...field}
                  size={'md'}
                  placeholder={'Например, Футболка'}
                  target={error ? 'destructive' : undefined}
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
      </section>

      <div className={s.columns}>
        <TemplateFields
          name={'productFields'}
          title={'Свойства товара'}
          description={'Общие свойства, которые заполняются один раз для товара.'}
          properties={properties.items}
          inProcess={inProcess}
        />
        <TemplateFields
          name={'variantFields'}
          title={'Свойства варианта'}
          description={'Свойства, которые заполняются отдельно для каждого варианта товара.'}
          properties={properties.items}
          inProcess={inProcess}
        />
      </div>
    </div>
  );
};
