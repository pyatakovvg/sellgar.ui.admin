import { CreateUserDto, UpdateUserDto } from '@library/domain';
import {
  InputField,
  SelectSimpleField,
  SelectMultipleField,
  CheckboxField,
  Paragraph,
  DatepickerField,
  Button,
  EVariant,
  EMode,
} from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { Formik, Form, type FormikHelpers } from 'formik';

import { useRoles } from '../../../../hooks/useRoles.ts';
import { useIsProcess } from '../../../../hooks/useIsProcess.ts';

import s from './default.module.scss';

interface IFormProps {
  user: UpdateUserDto | CreateUserDto;
  inProcess: boolean;
  onSubmit(event: UpdateUserDto | CreateUserDto, helpers: FormikHelpers<UpdateUserDto | CreateUserDto>): void;
}

export const FormModify: React.FC<IFormProps> = observer((props) => {
  const roles = useRoles();
  const isProcess = useIsProcess();

  return (
    <Formik enableReinitialize={true} initialValues={props.user} onSubmit={props.onSubmit}>
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
              <SelectSimpleField
                name={'person.sex'}
                label={'Пол'}
                optionKey={'uuid'}
                optionValue={'value'}
                options={[
                  { uuid: 'MALE', value: 'мужской' },
                  { uuid: 'FEMALE', value: 'женский' },
                ]}
                isSimplify={true}
              />
            </div>
            <div className={s.row}>
              <DatepickerField name={'person.birthday'} label={'День рождения'} displayFormat={'DD.MM.YYYY'} />
            </div>
            <div className={s.row}>
              <SelectMultipleField
                name={'roles'}
                label={'Роль'}
                options={roles}
                optionKey={'code'}
                optionValue={'displayName'}
              />
            </div>
            <div className={s.row}>
              <CheckboxField name={'isBlocked'}>
                <Paragraph>заблокировать</Paragraph>
              </CheckboxField>
            </div>
          </div>
          <div className={s.control}>
            {dirty && !isProcess && (
              <Button type={'reset'} variant={EVariant.SECONDARY} disabled={!dirty}>
                Сбросить
              </Button>
            )}
            <Button type={'submit'} mode={EMode.SUCCESS} inProcess={isProcess} disabled={!dirty && !isProcess}>
              Сохранить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
});
