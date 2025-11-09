import { Icon } from '@sellgar/kit';

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

export const Danger: React.FC<IProps> = (props) => {
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (props.autoClose) {
      timer = setTimeout(() => handleClose(), (props?.timeoutClose ?? 4) * 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
        <Icon icon={'close-line'} />
      </div>
    </div>
  );
};
