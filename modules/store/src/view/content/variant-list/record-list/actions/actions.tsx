import type { StoreAccountingRecordEntity } from '@library/domain';
import { StoreInventoryRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Button } from '@sellgar/kit';
import { StockLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import { RecordListContext } from '../record-list.context.ts';

import s from './default.module.scss';

interface IProps {
  record: StoreAccountingRecordEntity;
}

export const Actions: React.FC<IProps> = (props) => {
  const offer = React.useContext(RecordListContext);
  const navigate = App.useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (!offer) return;
    void navigate.to(StoreInventoryRoute, {
      params: {
        storeProductUuid: offer.storeProductUuid,
        recordUuid: props.record.uuid,
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
