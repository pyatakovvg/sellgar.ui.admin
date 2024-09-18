import { InputField, SelectSimpleField, Button, CheckboxField, Paragraph, EMode, EVariant } from '@library/kit';
import { ShopEntity } from '@library/domain';

import React from 'react';
import { observer } from 'mobx-react';
import { Formik, Form, FormikHelpers } from 'formik';

import { useCompanyList } from '@/root/hooks/useCompanyList';

import s from './default.module.scss';

interface IProps {
  shop: ShopEntity;
  onSubmit(value: ShopEntity, helper: FormikHelpers<ShopEntity>): void;
}

export const FormModify: React.FC<IProps> = observer((props) => {
  const companyList = useCompanyList();

  return (
    <Formik enableReinitialize={true} initialValues={props.shop} onSubmit={props.onSubmit}>
      {({ dirty }) => {
        return (
          <Form className={s.wrapper}>
            <div className={s.row}>
              <SelectSimpleField
                isSimplify
                label={'Компания'}
                name={'company.uuid'}
                optionKey={'uuid'}
                optionValue={'name'}
                options={companyList}
              />
            </div>
            <div className={s.row}>
              <InputField label={'Название'} name={'name'} />
            </div>
            <div className={s.row}>
              <InputField label={'Адрес'} name={'address'} />
            </div>
            <div className={s.row}>
              <CheckboxField name={'isActive'}>
                <Paragraph>вктивный</Paragraph>
              </CheckboxField>
            </div>

            <div className={s.row}>
              {dirty && (
                <Button type={'reset'} variant={EVariant.SECONDARY} disabled={!dirty}>
                  Сбросить
                </Button>
              )}
              <Button type={'submit'} mode={EMode.SUCCESS} disabled={!dirty}>
                Сохранить
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
});
