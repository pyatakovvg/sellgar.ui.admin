import { SelectSimpleField, SelectMultipleField, Button } from '@library/kit';

import React from 'react';
import { Formik, Form } from 'formik';

import { useRoles } from '@/hooks/useRoles.ts';

import s from './default.module.scss';

interface IProps {
  initialValues: any;
  onSubmit(values: any): void;
}

export const FilterForm: React.FC<IProps> = (props) => {
  const roles = useRoles();

  return (
    <Formik enableReinitialize={true} initialValues={props.initialValues} onSubmit={props.onSubmit}>
      {() => (
        <Form className={s.wrapper}>
          <div className={s.content}>
            <div className={s.row}>
              <div className={s.col}>
                <SelectMultipleField
                  label={'Роль'}
                  placeholder={'Выбрать роль'}
                  isSimplify={true}
                  isClearable={true}
                  name={'roles'}
                  options={roles}
                  optionKey={'code'}
                  optionValue={'displayName'}
                />
              </div>
              <div className={s.col}>
                <SelectSimpleField
                  label={'Статус'}
                  placeholder={'Выбрать статус'}
                  isSimplify={true}
                  isClearable={true}
                  name={'isBlocked'}
                  options={[
                    { code: 'ACTIVE', value: 'Активный' },
                    { code: 'BLOCKED', value: 'Заблокирован' },
                  ]}
                  optionKey={'code'}
                  optionValue={'value'}
                />
              </div>
            </div>
          </div>
          <div className={s.control}>
            <Button type={'submit'}>Применить</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
