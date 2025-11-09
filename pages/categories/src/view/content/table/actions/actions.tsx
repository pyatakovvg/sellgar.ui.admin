import { Button, Icon } from '@sellgar/kit';
import { cellContext } from '@sellgar/kit';

import React from 'react';

import { context } from '../../../modify';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const { data } = React.use(cellContext);
  const { onOpen } = React.useContext(context);

  const handleClick = (uuid: string) => {
    onOpen(uuid);
  };

  return (
    <div className={s.wrapper}>
      <Button
        form={'icon'}
        style={'ghost'}
        size={'sm'}
        leadIcon={<Icon icon={'more-2-fill'} />}
        onClick={() => handleClick(data.uuid)}
      />
    </div>
  );
};
