import { ButtonIcon, Icon } from '@sellgar/kit';
import { cellContext } from '@library/table';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const navigate = useNavigate();
  const { data } = React.use(cellContext);

  const handleClick = (type: 'edit' | 'delete') => {
    if (type === 'edit') {
      navigate('/brands/' + data.uuid);
    }
  };

  return (
    <div className={s.wrapper}>
      <ButtonIcon
        style={'ghost'}
        size={'sm'}
        icon={<Icon icon={'more-2-fill'} />}
        onClick={() => handleClick('edit')}
      />
    </div>
  );
};
