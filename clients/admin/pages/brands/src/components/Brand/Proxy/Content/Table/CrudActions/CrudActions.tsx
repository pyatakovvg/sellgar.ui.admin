import { Actions } from '@library/kit';
import { BrandEntity } from '@library/domain';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Actions as ActionsList } from './Actions';

import s from './default.module.scss';

interface IProps {
  data: BrandEntity;
}

export const CrudActions: React.FC<IProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = (type: 'edit' | 'delete') => {
    if (type === 'edit') {
      navigate('/brands/' + props.data.uuid);
    }
  };

  return (
    <div className={s.wrapper}>
      <Actions alignStart={'end'}>
        <ActionsList onClick={handleClick} />
      </Actions>
    </div>
  );
};
