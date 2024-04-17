import { Heading, Paragraph, Button, EVariant, EMode } from '@library/kit';

import React from 'react';
import { useBlocker } from 'react-router-dom';

import s from './default.module.scss';

export const Blocker = () => {
  const blocker = useBlocker(({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname);

  if (blocker.state === 'blocked') {
    return (
      <div className={s.wrapper}>
        <div className={s.header}>
          <Heading variant={'h3'}>Вы уверены что хотите выйти?</Heading>
        </div>
        <div className={s.content}>
          <Paragraph>Не сохраненные данные будут утеряны</Paragraph>
        </div>
        <div className={s.control}>
          <Button variant={EVariant.SECONDARY} mode={EMode.DANGER} onClick={() => blocker.proceed()}>
            Уйти
          </Button>
          <Button variant={EVariant.PRIMARY} mode={EMode.SUCCESS} onClick={() => blocker.reset()}>
            Остаться
          </Button>
        </div>
      </div>
    );
  }
  return null;
};
