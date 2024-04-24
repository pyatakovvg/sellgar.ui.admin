import { InputField, TextareaField, SelectSimpleField, Button } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { Formik, Form } from 'formik';

import { Blocker } from './Blocker';
import { context } from '../../product.context.ts';

import s from './default.module.scss';

interface IProps {
  product: any;
  onSubmit(values: any): void;
}

export const FormModify = observer((props: IProps) => {
  const { presenter } = React.useContext(context);

  return (
    <Formik initialValues={props.product} enableReinitialize={true} onSubmit={props.onSubmit}>
      {() => (
        <Form className={s.wrapper}>
          <Blocker />
          <div className={s.content}>
            <div className={s.row}>
              <InputField name={'title'} label={'Название'} />
            </div>
            <div className={s.row}>
              <TextareaField name={'description'} label={'Описание'} />
            </div>
            <div className={s.row}>
              <SelectSimpleField
                name={'categoryOnProduct'}
                label={'Категория'}
                optionKey={'code'}
                optionValue={'title'}
                options={presenter.categories}
              />
            </div>
            <div className={s.row}>
              <SelectSimpleField
                name={'brand.code'}
                label={'Бренд'}
                optionKey={'code'}
                optionValue={'name'}
                options={presenter.brands}
              />
            </div>
          </div>
          <div className={s.control}>
            <Button type={'submit'}>Сохранить</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
});
