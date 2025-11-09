import { Button, Icon, Typography } from '@sellgar/kit';

import React from 'react';

import { context as modifyContext } from '../modify';
import { context as modifyGroupContext } from '../modify-group';

import s from './default.module.scss';

export const Header = () => {
  const { onOpen: onModifyOpen } = React.useContext(modifyContext);
  const { onOpen: onModifyGroupOpen } = React.useContext(modifyGroupContext);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Свойства</h6>
        </Typography>
      </div>
      <div className={s.link}>
        <Button
          size={'sm'}
          style={'secondary'}
          leadIcon={<Icon icon={'add-line'} />}
          onClick={() => onModifyGroupOpen()}
        >
          Добавить группу
        </Button>
      </div>
      <div className={s.link}>
        <Button size={'sm'} leadIcon={<Icon icon={'add-line'} />} onClick={() => onModifyOpen()}>
          Добавить свойство
        </Button>
      </div>
    </div>
  );
};
