import { InputField, SelectField, DatepickerField, Button, EVariant, EMode } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { Formik, Form, type FormikHelpers } from 'formik';

import { context } from '../../user.context.ts';

import s from './default.module.scss';

export interface IPerson {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface IUser {
  uuid?: string;
  email?: string;
  isBlocked?: boolean;
  person?: IPerson;
}

interface IFormProps {
  user?: IUser;
  inProcess: boolean;
  onSubmit(event: IUser, helpers: FormikHelpers<IUser>): void;
}

export const FormModify: React.FC<IFormProps> = observer((props) => {
  const { controller } = React.useContext(context);

  const inProcess = controller.isUpsertProcess;

  return (
    <Formik enableReinitialize={true} initialValues={props.user ?? {}} onSubmit={props.onSubmit}>
      {({ dirty }) => (
        <Form className={s.wrapper}>
          <div className={s.content}>
            <div className={s.row}>
              <InputField autoFocus type={'email'} label={'Логин'} name={'email'} />
            </div>
            <div className={s.row}>
              <InputField name={'person.lastName'} label={'Фамилия'} />
            </div>
            <div className={s.row}>
              <InputField name={'person.firstName'} label={'Имя'} />
            </div>
            <div className={s.row}>
              <InputField name={'person.middleName'} label={'Отчество'} />
            </div>
            <div className={s.row}>
              <SelectField
                name={'person.sex'}
                label={'Пол'}
                optionKey={'uuid'}
                optionValue={'value'}
                options={[
                  { uuid: 'MALE', value: 'мужской' },
                  { uuid: 'FEMALE', value: 'женский' },
                ]}
              />
            </div>
            <div className={s.row}>
              <DatepickerField name={'person.birthday'} label={'День рождения'} displayFormat={'DD.MM.YYYY'} />
            </div>
            <div className={s.row}>
              <SelectField
                name={'roles'}
                isMultiselect={true}
                label={'Роль'}
                optionKey={'code'}
                optionValue={'displayName'}
                options={controller.roles}
              />
            </div>
          </div>
          <div className={s.control}>
            {dirty && !inProcess && (
              <Button type={'reset'} variant={EVariant.SECONDARY} disabled={!dirty}>
                Сбросить
              </Button>
            )}
            <Button type={'submit'} mode={EMode.SUCCESS} inProcess={inProcess} disabled={!dirty && !inProcess}>
              Сохранить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
});
