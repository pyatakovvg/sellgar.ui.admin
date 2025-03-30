import { ButtonIcon, Icon } from '@sellgar/kit';
import { PropertyGroupEntity } from '@library/domain';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from './default.module.scss';

interface IProps {
  data: PropertyGroupEntity;
}

export const Actions: React.FC<IProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = (type: 'edit' | 'delete') => {
    if (type === 'edit') {
      navigate('/properties/groups/' + props.data.uuid);
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
