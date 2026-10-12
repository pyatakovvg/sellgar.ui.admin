import React from 'react';
import type { NavigationBlockerViewProps } from '@sellgar/app/react';
import { Button, Modal, Typography } from '@sellgar/kit';

import s from './default.module.scss';

export const NavigationBlockerView: React.FC<NavigationBlockerViewProps> = (props) => {
  return (
    <Modal open={true} onClose={() => props.stay()}>
      <div className={s.wrapper}>
        <Typography size={'body-m'} weight={'semi-bold'}>
          <p className={s.title}>Уйти без сохранения?</p>
        </Typography>
        <Typography size={'caption-m'}>
          <p className={s.description}>Внесённые изменения будут потеряны.</p>
        </Typography>
        <div className={s.controls}>
          <Button autoFocus={true} size={'sm'} disabled={props.inProcess} onClick={() => props.stay()}>
            Остаться
          </Button>
          <Button target={'destructive'} size={'sm'} disabled={props.inProcess} onClick={() => props.leave()}>
            Уйти без сохранения
          </Button>
        </div>
      </div>
    </Modal>
  );
};
