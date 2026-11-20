import React from 'react';
import * as RHF from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as App from '@sellgar/app/react';
import { FrameLayout } from '@library/design';
import { Button, Drawer, Typography } from '@sellgar/kit';
import { VariantFormMapper } from '../classes/controller/variant-modify/mapper/variant-form.mapper.ts';
import { VariantModifyControllerInterface } from '../classes/controller/variant-modify/variant-modify-controller.interface.ts';
import type { VariantFormInput } from '../classes/controller/variant-modify/input/variant-form.input.ts';
import { Fields } from './fields';
import { schema } from './schema.ts';
import s from './default.module.css';

export const FrameView: React.FC = () => {
  const data = App.useLoaderData(VariantModifyControllerInterface);
  const submit = App.useSubmit(VariantModifyControllerInterface);
  const methods = RHF.useForm<VariantFormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: VariantFormMapper.toFormInput(data),
  });
  React.useEffect(() => {
    methods.reset(VariantFormMapper.toFormInput(data));
  }, [methods, data.productUuid, data.variant?.uuid]);

  App.useBlocker(methods.formState.isDirty);
  const handleSubmit = methods.handleSubmit(async (input) => {
    await submit(input);
  });
  return (
    <FrameLayout>
      <FrameLayout.Header>
        <div className={s.header}>
          <Typography size={'body-m'} weight={'medium'}>
            {data.variant ? 'Редактирование варианта' : 'Новый вариант'}
          </Typography>
          <Drawer.Close />
        </div>
      </FrameLayout.Header>
      <FrameLayout.Content>
        <RHF.FormProvider {...methods}>
          <form id={'variant-form'} className={s.wrapper} onSubmit={handleSubmit}>
            <fieldset disabled={submit.inProcess} className={s.fieldset}>
              <Fields />
            </fieldset>
          </form>
        </RHF.FormProvider>
      </FrameLayout.Content>
      <FrameLayout.Controls>
        <div className={s.controls}>
          <Button type={'submit'} form={'variant-form'} inProcess={submit.inProcess} disabled={submit.inProcess}>
            Сохранить
          </Button>
        </div>
      </FrameLayout.Controls>
    </FrameLayout>
  );
};
