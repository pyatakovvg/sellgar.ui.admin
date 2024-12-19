import { useNavigate } from '@library/app';
import { Field, Input, Button } from '@library/kit';
import { useChangeBreadcrumb } from '@library/breadcrumbs';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Common } from './Common';
import { Prices } from './Prices';
import { Variants } from './Variants';
import { Properties } from './Properties';

import { CreateProductDto } from '../../../../../classes/store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../../../../../classes/store/form/dto/update-product.dto.ts';

import { useCreateProductRequest } from '../../../../../hooks/create-product-request.hook.ts';
import { useUpdateProductRequest } from '../../../../../hooks/update-product-request.hook.ts';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
  defaultValues(): Promise<UpdateProductDto | CreateProductDto>;
}

export const Form: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const changeBreadcrumb = useChangeBreadcrumb();

  const createRequest = useCreateProductRequest();
  const updateRequest = useUpdateProductRequest();

  const methods = useForm<CreateProductDto | UpdateProductDto>({ defaultValues: props.defaultValues });

  const values = methods.getValues();

  React.useEffect(() => {
    if (values) {
      changeBreadcrumb('PRODUCT_MODIFY', values.name);
    }
  }, [values]);

  const onSubmit = methods.handleSubmit(async (dto: CreateProductDto | UpdateProductDto) => {
    if ('uuid' in dto) {
      const result = await updateRequest(dto);

      if (result) {
        methods.reset(result);
      }
    } else {
      const result = await createRequest(dto);

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
            <Prices />
          </div>

          <div className={s.field}>
            <Variants />
          </div>

          <div className={s.field}>
            <Properties />
          </div>

          <div className={s.field}>
            <Field error={methods.formState.errors.description?.message}>
              <Input {...methods.register('description')} placeholder={'Описание'} />
            </Field>
          </div>
        </div>
        <div className={s.control}>
          <Button type={'submit'} inProcess={props.inProcess}>
            Сохранить
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
