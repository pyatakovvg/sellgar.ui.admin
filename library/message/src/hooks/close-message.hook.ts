import React from 'react';

import { context } from '../message.context.ts';

export const useCloseMessage = () => {
  const { presenter } = React.useContext(context);

  return (uuid: string) => presenter.close(uuid);
};
