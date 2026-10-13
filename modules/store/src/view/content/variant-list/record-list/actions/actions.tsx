import type { StoreAccountingRecordEntity } from '@library/domain';
import { StoreInventoryRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import * as Kit from '@sellgar/kit';
import { Button } from '@sellgar/kit';
import { StockLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import { RecordListContext } from '../record-list.context.ts';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const offer = React.useContext(RecordListContext);
  const navigate = App.useNavigate();
  const { data } = Kit.useCellData<StoreAccountingRecordEntity>();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (!offer) return;
    void navigate.to(StoreInventoryRoute, {
      params: {
        storeProductUuid: offer.storeProductUuid,
        recordUuid: data.uuid,
      },
    });
  };

  return (
    <div className={s.wrapper}>
      <Button.Icon
        style={'ghost'}
        size={'sm'}
        leadIcon={<StockLineIcon />}
        aria-label={'Управлять остатками'}
        onClick={handleClick}
      />
    </div>
  );
};
