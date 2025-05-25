import React from 'react';
import { observer } from 'mobx-react';

import { Danger } from './Danger';
import { Primary } from './Primary';
import { Success } from './Success';

import { useGetMessages } from '../../hooks/get-messages.hook.ts';
import { MessageEntity } from '../../classes/stores/entity/message.entity.ts';

import s from './default.module.scss';

interface IProps {
  push: MessageEntity;
}

const MessageByMode: React.FC<IProps> = (props) => {
  switch (props.push.target) {
    case 'success':
      return <Success {...props} />;
    case 'destructive':
      return <Danger {...props} />;
    default:
      return <Primary {...props} />;
  }
};

export const Container: React.FC = observer(() => {
  const messages = useGetMessages();

  return (
    <div className={s.container}>
      {messages.map((push) => (
        <div className={s.message} key={push.uuid}>
          <MessageByMode push={push} />
        </div>
      ))}
    </div>
  );
});
