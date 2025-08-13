import { Button, Icon, Animate } from '@sellgar/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { Confirm } from './confirm';

import { context } from '../widget.context.tsx';

import { useLogout } from '../hooks/logout.request.ts';

export const WidgetView = observer(() => {
  const [isConfirm, setConfirm] = React.useState(false);

  const logout = useLogout();

  const { controller } = React.useContext(context);

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
