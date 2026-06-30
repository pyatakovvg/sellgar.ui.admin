import { ButtonGroup, Button, Typography } from '@sellgar/kit';
import { ShieldUserLineIcon, SunFillIcon, SunLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import { context } from '../widget.context.ts';

import s from './default.module.scss';

interface IProps {
  isOnlyIcon?: boolean;
}

export const WidgetView: React.FC<IProps> = (props) => {
  const { setTheme, preference } = React.useContext(context);

  if (props.isOnlyIcon) {
    switch (preference) {
      case 'dark':
        return <Button.Icon size={'sm'} style={'secondary'} leadIcon={<SunFillIcon />} />;
      case 'light':
        return <Button.Icon size={'sm'} style={'secondary'} leadIcon={<SunLineIcon />} />;
      default:
        return <Button.Icon size={'sm'} style={'secondary'} leadIcon={<ShieldUserLineIcon />} />;
    }
  }

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'}>
        <p className={s.title}>Тема:</p>
      </Typography>

      <ButtonGroup size={'sm'}>
        <ButtonGroup.Icon
          isActive={preference === 'system'}
          leadIcon={<ShieldUserLineIcon />}
          onClick={() => setTheme(undefined)}
        >
          Системная
        </ButtonGroup.Icon>
        <ButtonGroup.Icon
          isActive={preference === 'light'}
          leadIcon={<SunLineIcon />}
          onClick={() => setTheme('light')}
        >
          Светлая
        </ButtonGroup.Icon>
        <ButtonGroup.Icon isActive={preference === 'dark'} leadIcon={<SunFillIcon />} onClick={() => setTheme('dark')}>
          Темная
        </ButtonGroup.Icon>
      </ButtonGroup>
    </div>
  );
};
