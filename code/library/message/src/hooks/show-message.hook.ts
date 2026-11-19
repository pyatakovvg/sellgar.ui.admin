import React from 'react';

import { context } from '../message.context.ts';

import { MessageEntity } from '../classes/stores/entity/message.entity.ts';

export const useShowMessage = () => {
  const { presenter } = React.useContext(context);

  return (push: Omit<MessageEntity, 'uuid'>) => {
    presenter.show(push);
  };
};
