import React from 'react';

import { Button, Modal, Typography } from '@sellgar/kit';
import type { UserRequestAlertViewProps } from '@sellgar/app';

import s from './default.module.scss';

export const AlertUserRequestView: React.FC<UserRequestAlertViewProps> = ({ apply, cancel, request }) => {
  return (
    <Modal open={true} onClose={cancel}>
      <div className={s.wrapper}>
        <div className={s.content}>
          {request.payload.title && (
            <Typography size={'body-m'} weight={'semi-bold'}>
              <p className={s.title}>{request.payload.title}</p>
            </Typography>
          )}
          {request.payload.description && (
            <Typography size={'caption-m'}>
              <p className={s.description}>{request.payload.description}</p>
            </Typography>
          )}
        </div>
        <div className={s.control}>
          <Button autoFocus={true} size={'sm'} onClick={() => apply()}>
            {request.payload.applyText ?? 'Ок'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
