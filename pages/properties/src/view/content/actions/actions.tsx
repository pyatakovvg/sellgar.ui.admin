import { Button, Icon } from '@sellgar/kit';
import { PropertyGroupEntity } from '@library/domain';
import { PropertyGroupModifyFrame } from '@frame/property-group-modify';
import { useFrame } from '@tiyn/app';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  data: PropertyGroupEntity;
}

export const Actions: React.FC<IProps> = (props) => {
  const frame = useFrame(PropertyGroupModifyFrame);

  return (
    <div className={s.wrapper}>
      <Button
        form={'icon'}
        style={'ghost'}
        size={'sm'}
        leadIcon={<Icon icon={Icon.editLine} />}
        onClick={() => void frame.open({ uuid: props.data.uuid })}
      />
    </div>
  );
};
