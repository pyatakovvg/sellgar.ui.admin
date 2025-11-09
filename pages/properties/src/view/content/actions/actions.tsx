import { Button, Icon } from '@sellgar/kit';
import { PropertyGroupEntity } from '@library/domain';

import React from 'react';

import { context } from '../../modify-group';

import s from './default.module.scss';

interface IProps {
  data: PropertyGroupEntity;
}

export const Actions: React.FC<IProps> = (props) => {
  const { onOpen } = React.useContext(context);

  return (
    <div className={s.wrapper}>
      <Button
        form={'icon'}
        style={'ghost'}
        size={'sm'}
        leadIcon={<Icon icon={Icon.editLine} />}
        onClick={() => onOpen(props.data.uuid)}
      />
    </div>
  );
};
