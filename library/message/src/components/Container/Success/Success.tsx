import React from 'react';

import { useCloseMessage } from '../../../hooks/close-message.hook.ts';
import { MessageEntity } from '../../../classes/stores/entity/message.entity.ts';

import s from './default.module.scss';

interface IProps {
  push: MessageEntity;
}

const Content: React.FC<React.PropsWithChildren> = (props) => {
  if (React.isValidElement(props.children)) {
    return props.children;
  }
  return <p className={s.text}>{props.children}</p>;
};

export const Success: React.FC<IProps> = (props) => {
  const close = useCloseMessage();

  const handleClose = () => {
    close(props.push.uuid);
  };

  return (
    <div className={s.wrapper}>
      {props.push.title && (
        <div className={s.header}>
          <p className={s.title}>{props.push.title}</p>
        </div>
      )}
      <div className={s.content}>
        <Content>{props.push.content}</Content>
      </div>
      <div className={s.close} onClick={handleClose}>
        <p>X</p>
      </div>
    </div>
  );
};
