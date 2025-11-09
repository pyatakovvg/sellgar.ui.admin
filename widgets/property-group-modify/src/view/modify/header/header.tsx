import { Typography } from '@sellgar/kit';

import React from 'react';

interface IProps {
  isEdit: boolean;
}

export const Header: React.FC<IProps> = (props) => {
  if (props.isEdit) {
    return (
      <Typography size={'body-l'}>
        <h6>Редактировать группу</h6>
      </Typography>
    );
  }

  return (
    <Typography size={'body-l'}>
      <h6>Новая группа</h6>
    </Typography>
  );
};
