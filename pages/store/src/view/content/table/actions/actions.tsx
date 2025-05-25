import { ButtonIcon, Icon, useCellData } from '@sellgar/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from './default.module.scss';
import { ProductEntity } from '@library/domain';

export const Actions: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useCellData<ProductEntity>();

  const handleClick = () => {
    navigate('/store/' + data.uuid);
  };

  return (
    <div className={s.wrapper}>
      <ButtonIcon style={'ghost'} size={'sm'} icon={<Icon icon={'more-2-fill'} />} onClick={() => handleClick()} />
    </div>
  );
};
