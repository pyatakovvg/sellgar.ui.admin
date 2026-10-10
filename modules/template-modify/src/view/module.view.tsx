import { yupResolver } from '@hookform/resolvers/yup';
import { Page } from '@library/design';
import * as App from '@sellgar/app/react';
import { Button } from '@sellgar/kit';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { TemplateModifyControllerInterface } from '../classes/controller/template-modify-controller.interface.ts';
import { TemplateFormMapper } from '../classes/controller/mapper/template-form.mapper.ts';
import type { TemplateFormInput } from '../classes/controller/input/template-form.input.ts';
import { TemplateForm } from './template-form/template-form.tsx';
import { schema } from './schema.ts';

import s from './module.module.scss';

const ModuleViewComponent: React.FC = () => {
  const { template } = App.useLoaderData(TemplateModifyControllerInterface);
  const submit = App.useSubmit(TemplateModifyControllerInterface);
  const form = useForm<TemplateFormInput>({
    mode: 'onChange',
    defaultValues: TemplateFormMapper.toFormInput(template),
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    form.reset(TemplateFormMapper.toFormInput(template));
  }, [form, template?.uuid, template?.version]);

  const handleSubmit = form.handleSubmit(async (input) => {
    const result = await submit(input);
    form.reset(TemplateFormMapper.toFormInput(result));
  });

  return (
    <FormProvider {...form}>
      <form className={s.form} onSubmit={handleSubmit}>
        <Page>
          <Page.Header>
            <Page.Header.Title>{template ? 'Редактирование шаблона' : 'Новый шаблон'}</Page.Header.Title>
            <Page.Header.Controls>
              <Button type={'submit'} disabled={submit.inProcess} inProcess={submit.inProcess}>
                Сохранить
              </Button>
            </Page.Header.Controls>
          </Page.Header>
          <Page.Content>
            <TemplateForm inProcess={submit.inProcess} />
          </Page.Content>
        </Page>
      </form>
    </FormProvider>
  );
};

export const ModuleView = App.reactive(ModuleViewComponent);
