import { Typography, Container } from '@sellgar/kit';

import React from 'react';
import { useRouteError } from 'react-router-dom';
import { ValidationError } from 'class-validator';

import { Error } from './error';

import s from './default.module.scss';

const getErrors = (errors: ValidationError[]): any[] => {
  return errors.reduce<any>((accum, error) => {
    if (!!error.children?.length) {
      const target = error.target?.constructor.name ?? undefined;
      const property = error.property;
      const children = getErrors(error.children);
      const message = `${target}['${property}']` + children;

      accum[accum.length - 1] = {
        message,
        property,
        value: error.value,
        target: error.target?.constructor.name,
        constraints: error.constraints,
      };

      return [...accum, ...getErrors(error.children)];
    }

    const target = error.target?.constructor.name ?? undefined;
    const property = error.property;
    const message = `${target}['${property}']`;

    accum.push({
      message,
      property,
      value: error.value,
      target: error.target?.constructor.name,
      constraints: error.constraints,
    });

    return accum;
  }, []);
};

export const Validation: React.FC = () => {
  const errors = useRouteError() as ValidationError[];

  const errorsMessage = getErrors(errors);

  return (
    <div className={s.wrapper}>
      <div className={s.context}>
        <Container>
          <div className={s.container}>
            <div className={s.header}>
              <Typography size={'body-m'} weight={'semi-bold'}>
                <p>Что-то пошло не так!</p>
              </Typography>
            </div>
            <div className={s.content}>
              {errorsMessage.map((error, index) => (
                <div key={index} className={s.error}>
                  <Error error={error} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
