import { BrandModifyFrame } from '@frame/brand-modify';
import { Button, Icon, useCellData } from '@sellgar/kit';
import { useFrame } from '@tiyn/app';
import { BrandEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const { data } = useCellData<BrandEntity>();
  const brandModifyFrame = useFrame(BrandModifyFrame);

  return (
    <div className={s.wrapper}>
      <Button
        form={'icon'}
        style={'ghost'}
        size={'sm'}
        leadIcon={<Icon icon={'more-2-fill'} />}
        onClick={() => void brandModifyFrame.open({ uuid: data.uuid })}
      />
    </div>
  );
};
