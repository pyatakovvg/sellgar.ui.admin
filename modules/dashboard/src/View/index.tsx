import { Dialog, Button } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { CompanyModule } from '../widgets/CompanyWidget';

import s from './default.module.scss';

export const DashboardView = observer(() => {
  const [dialog1, setDialog1] = React.useState(false);
  const [dialog2, setDialog2] = React.useState(false);

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.container}>
          <div className={s.section}>
            <Button onClick={() => setDialog1(true)}>Open Dialog1</Button>
            <CompanyModule />
          </div>
        </div>
      </div>
      <Dialog isOpen={dialog1} onClose={() => setDialog1(false)}>
        <div style={{ width: 600 }}>
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
          <Button onClick={() => setDialog2(true)}>Open Dialog2</Button>
        </div>
      </Dialog>
      <Dialog isOpen={dialog2} onClose={() => setDialog2(false)}>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
      </Dialog>
    </div>
  );
});
