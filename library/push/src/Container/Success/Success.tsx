import { Icon } from '@library/kit';

import React from 'react';

import type { IPush } from '../../types';

import s from './default.module.scss';

interface IProps extends IPush {
  onClose(): void;
}

const Content: React.FC<React.PropsWithChildren> = (props) => {
  if (React.isValidElement(props.children)) {
    return props.children;
  }
  return <p className={s.text}>{props.children}</p>;
};

export const Success: React.FC<IProps> = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div className={s.wrapper}>
      {props.title && (
        <div className={s.header}>
          <p className={s.title}>{props.title}</p>
        </div>
      )}
      <div className={s.content}>
        <Content>{props.content}</Content>
      </div>
      <div className={s.close} onClick={handleClose}>
        <Icon icon={'xmark'} />
      </div>
    </div>
  );
};
