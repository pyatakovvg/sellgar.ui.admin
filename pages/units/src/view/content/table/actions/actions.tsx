import { Button, Icon, useCellData } from '@sellgar/kit';

import React from 'react';

import { context } from '../../../modify';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const { data } = useCellData();
  const { onOpen } = React.useContext(context);

  return (
    <div className={s.wrapper}>
      <Button
        form={'icon'}
        style={'ghost'}
        size={'sm'}
        leadIcon={<Icon icon={'more-2-fill'} />}
        onClick={() => onOpen(data.uuid)}
      />
    </div>
  );
};
