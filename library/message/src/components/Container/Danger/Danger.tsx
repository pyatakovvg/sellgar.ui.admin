import { Notification } from '@sellgar/kit';

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

export const Danger: React.FC<IProps> = (props) => {
  const close = useCloseMessage();

  // React.useEffect(() => {
  //   let timer: NodeJS.Timeout;
  //   if (props.push.autoClose) {
  //     timer = setTimeout(() => handleClose(), (props?.push.timeoutClose ?? 4) * 1000);
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  const handleClose = () => {
    close(props.push.uuid);
  };

  return (
    <Notification
      style={'destructive'}
      title={props.push.title}
      slot={<Content>{props.push.content}</Content>}
      onClose={handleClose}
    />
  );
};
