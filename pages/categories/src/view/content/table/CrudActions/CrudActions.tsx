import { Actions } from '@library/kit';
import { cellContext } from '@library/table';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Actions as ActionsList } from './Actions';

import s from './default.module.scss';

interface IProps {}

export const CrudActions: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const { data } = React.use(cellContext);

  const handleClick = (type: 'edit' | 'delete') => {
    if (type === 'edit') {
      navigate('/categories/' + data.uuid);
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
