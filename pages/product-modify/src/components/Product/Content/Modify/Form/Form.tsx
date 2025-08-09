import { useNavigate } from '@library/app';
import { Textarea, Button } from '@sellgar/kit';
import { Field } from '@library/kit';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Common } from './Common';
import { Variants } from './Variants';
import { Properties } from './Properties';

import { CreateProductDto } from '../../../../../classes/store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../../../../../classes/store/form/dto/update-product.dto.ts';

import { useCreateProductRequest } from '../../../../../hooks/create-product-request.hook.ts';
import { useUpdateProductRequest } from '../../../../../hooks/update-product-request.hook.ts';

import { schema } from './schema.ts';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
  defaultValues(): Promise<UpdateProductDto | CreateProductDto>;
}

type IForm = UpdateProductDto | CreateProductDto;

export const Form: React.FC<IProps> = (props) => {
  const navigate = useNavigate();

  const createRequest = useCreateProductRequest();
  const updateRequest = useUpdateProductRequest();

  const methods = useForm<IForm>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = methods.handleSubmit(async (dto) => {
    if ('uuid' in dto) {
      const result = await updateRequest(dto as never as UpdateProductDto);

      if (result) {
        methods.reset(result);
      }
    } else {
      const result = await createRequest(dto as never as CreateProductDto);

      if (result) {
        navigate('/products/' + result.uuid);
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <form className={s.wrapper} onSubmit={onSubmit}>
        <div className={s.fields}>
          <div className={s.field}>
            <Common />
          </div>

          <div className={s.field}>
            <Variants />
          </div>
          <div className={s.field}>
            <Properties />
          </div>
          <div className={s.field}>
            <Field error={methods.formState.errors.description?.message}>
              <Textarea {...methods.register('description')} placeholder={'Описание'} />
            </Field>
          </div>
        </div>
        <div className={s.control}>
          <Button type={'submit'}>Сохранить</Button>
        </div>
      </form>
    </FormProvider>
  );
};
