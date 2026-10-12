import { useLoaderData } from '@sellgar/app/react';
import { Divider, Notification } from '@sellgar/kit';

import React from 'react';

import { Legal } from './legal';
import { Individual } from './individual';

import { ShopModifyControllerInterface } from '../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';

import s from './default.module.css';

export const Type: React.FC = () => {
  const data = useLoaderData(ShopModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Divider type={'label-center'} label={'Юридические сведения'} />
      <div className={s.content}>
        {!data.legalDetails?.legalForm && <Notification.Static status={'warning'} description={'Нет данных'} />}
        {data.legalDetails?.legalForm === 'legal_entity' && <Legal />}
        {data.legalDetails?.legalForm === 'individual_entrepreneur' && <Individual />}
      </div>
    </div>
  );
};
