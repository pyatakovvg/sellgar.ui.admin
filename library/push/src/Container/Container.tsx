import React from 'react';
import { observer } from 'mobx-react';

import { Danger } from './Danger';
import { Primary } from './Primary';
import { Success } from './Success';

import { PushController } from '../controller';

import type { IPush } from '@/types';

import s from './default.module.scss';

interface IContainer {
  controller: PushController;
}

interface IProps extends IPush {
  onClose(): void;
}

const Push: React.FC<IProps> = (props) => {
  switch (props.variant) {
    case 'success':
      return <Success {...props} />;
    case 'danger':
      return <Danger {...props} />;
    default:
      return <Primary {...props} />;
  }
};

export const Container: React.FC<IContainer> = observer((props) => {
  const handleClosePush = (uuid: string) => {
    props.controller.remove(uuid);
  };

  return (
    <div className={s.container}>
      {props.controller.items.map((push) => (
        <div className={s.push} key={push.uuid}>
          <Push {...push} onClose={() => handleClosePush(push.uuid)} />
        </div>
      ))}
    </div>
  );
});
