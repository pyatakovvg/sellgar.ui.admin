import { Button, InputField, Paragraph, Description, Link } from '@library/kit';

import React from 'react';
import { Formik, Form, type FormikErrors } from 'formik';

import s from './default.module.scss';

export interface IFormValues {
  login: string;
  password: string;
}

interface IFormProps {
  inProcess: boolean;
  onSubmit(event: IFormValues): void;
}

const validate = (values: IFormValues) => {
  const errors: FormikErrors<IFormValues> = {};

  if (!values.login) {
    errors.login = 'Необходимо заполнить';
  }

  if (!values.password) {
    errors.password = 'Необходимо заполнить2';
  }

  return errors;
};

export const SignInForm: React.FC<IFormProps> = (props) => {
  return (
    <Formik initialValues={{ login: '', password: '' }} validate={validate} onSubmit={props.onSubmit}>
      <Form className={s.wrapper}>
        <div className={s.content}>
          <div className={s.head}>
            <Paragraph>Введите данные выданные вашим админестрацией или полученные по почте</Paragraph>
          </div>
          <div className={s.row}>
            <InputField autoFocus type={'email'} label={'Логин'} name={'login'} />
          </div>
          <div className={s.row}>
            <InputField type={'password'} label={'Пароль'} name={'password'} />
          </div>
        </div>
        <div className={s.description}>
          <Description>Убедитесь в правильности введенных данных и держите их в полном секрете</Description>
        </div>
        <div className={s.control}>
          <Button type={'submit'} inProcess={props.inProcess}>
            Войти
          </Button>
        </div>
        <div className={s.registry}>
          <Link href={import.meta.env.VITE_PUBLIC_URL + '/sign-up'}>Регистрация</Link>
        </div>
      </Form>
    </Formik>
  );
};
