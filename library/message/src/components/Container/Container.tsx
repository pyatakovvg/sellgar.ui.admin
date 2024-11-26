import React from 'react';
import { observer } from 'mobx-react';

import { Danger } from './Danger';
import { Primary } from './Primary';
import { Success } from './Success';

import { useGetMessages } from '../../hooks/get-messages.hook.ts';
import { MessageEntity } from '../../classes/stores/entity/message.entity.ts';

import s from './default.module.scss';
import { EMode } from '@library/kit';

interface IProps {
  push: MessageEntity;
}

const MessageByMode: React.FC<IProps> = (props) => {
  switch (props.push.mode) {
    case EMode.SUCCESS:
      return <Success {...props} />;
    case EMode.DANGER:
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
