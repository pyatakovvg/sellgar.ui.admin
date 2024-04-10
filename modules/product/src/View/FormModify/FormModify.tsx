import { InputField, TextareaField, SelectField, Button } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { Formik, Form } from 'formik';
import { useBlocker } from 'react-router-dom';

import { Blocker } from './Blocker';
import { context } from '../../product.context.ts';

import s from './default.module.scss';

interface IProps {
  product: any;
  onSubmit(values: any): void;
}

export const FormModify = observer((props: IProps) => {
  const { controller } = React.useContext(context);

  return (
    <Formik initialValues={props.product} enableReinitialize={true} onSubmit={props.onSubmit}>
      {() => (
        <Form className={s.wrapper}>
          <div className={s.content}>
            <div className={s.row}>
              <InputField name={'title'} label={'Название'} />
            </div>
            <div className={s.row}>
              <TextareaField name={'description'} label={'Описание'} />
            </div>
            <div className={s.row}>
              <SelectField
                name={'categoryOnProduct'}
                label={'Категория'}
                optionKey={'code'}
                optionValue={'title'}
                options={controller.categories}
                isMultiselect={true}
              />
            </div>
            <div className={s.row}>
              <SelectField
                name={'brand.code'}
                label={'Бренд'}
                optionKey={'code'}
                optionValue={'name'}
                options={controller.brands}
              />
            </div>
          </div>
          <div className={s.control}>
            <Button type={'submit'}>Сохранить</Button>
          </div>
          <Blocker />
        </Form>
      )}
    </Formik>
  );
});
