import React from 'react';

import s from './default.module.scss';

const FormComponent: React.FC<
  React.PropsWithChildren<Omit<React.FormHTMLAttributes<HTMLFormElement>, 'className'>>
> = ({ children, ...props }) => {
  return (
    <form {...props} className={s.wrapper}>
      {children}
    </form>
  );
};

const Fields: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.fields}>{props.children}</div>;
};

const Field: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.field}>{props.children}</div>;
};

type TPage = typeof FormComponent & {
  Fields: typeof Fields & {
    Field: typeof Field;
  };
};

export const Form: TPage = Object.assign(FormComponent, {
  Fields: Object.assign(Fields, {
    Field,
  }),
});
