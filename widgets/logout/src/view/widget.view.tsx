import * as App from '@sellgar/app';
import { Button } from '@sellgar/kit';
import { LogoutBoxLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import { LogoutControllerInterface } from '../classes/controller/logout/logout-controller.interface.ts';

import { Confirm } from './confirm';

import s from './default.module.scss';

export const WidgetView: React.FC = () => {
  const [isConfirm, setConfirm] = React.useState(false);
  const submit = App.useSubmit(LogoutControllerInterface);

  const handleExit = () => {
    setConfirm(true);
  };

  const handleApply = async () => {
    setConfirm(false);

    await submit();
  };

  const handleCancel = () => {
    setConfirm(false);
  };

  return (
    <div className={s.wrapper}>
      <Button
        style={'secondary'}
        size={'sm'}
        disabled={submit.inProcess}
        inProcess={submit.inProcess}
        leadIcon={<LogoutBoxLineIcon />}
        onClick={handleExit}
      >
        Выйти
      </Button>
      <Confirm open={isConfirm} onApply={handleApply} onCancel={handleCancel} />
    </div>
  );
};
