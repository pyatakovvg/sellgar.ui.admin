import { Button, Icon, Animate } from '@sellgar/kit';
import { useWidgetController } from '@library/app';

import React from 'react';
import { observer } from 'mobx-react';

import { Confirm } from './confirm';

import { useLogout } from '../hooks/logout.request.ts';
import { LogoutControllerInterface } from '../classes/controller/logout-controller.interface.ts';

export const WidgetView: React.FC = observer(() => {
  const [isConfirm, setConfirm] = React.useState(false);

  const controller = useWidgetController(LogoutControllerInterface);

  const logout = useLogout();

  const handleExit = () => {
    setConfirm(true);
  };

  const handleApply = async () => {
    setConfirm(false);

    await logout();
  };

  const handleCancel = () => {
    setConfirm(false);
  };

  return (
    <>
      <Button
        style={'secondary'}
        size={'sm'}
        leadIcon={
          controller.logoutStore.inProcess ? (
            <Animate.Spin>
              <Icon icon={'loader-4-fill'} />
            </Animate.Spin>
          ) : (
            <Icon icon={'logout-box-line'} />
          )
        }
        onClick={handleExit}
      >
        Выйти
      </Button>
      <Confirm open={isConfirm} onApply={handleApply} onCancel={handleCancel} />
    </>
  );
});
