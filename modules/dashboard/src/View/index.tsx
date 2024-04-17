import { Dialog, Button } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { CompanyModule } from '../widgets/CompanyWidget';

import s from './default.module.scss';

export const DashboardView = observer(() => {
  const [isOpenDialog, setOpenDialog] = React.useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Button onClick={handleOpen}>Open dialog</Button>
        <div className={s.container}>
          <div className={s.section}>
            <CompanyModule />
          </div>
        </div>
      </div>
      <Dialog isOpen={isOpenDialog} onClose={handleClose}>
        <Dialog.Header>
          <p>Hello</p>
        </Dialog.Header>
        <p>Hello</p>
      </Dialog>
    </div>
  );
});
