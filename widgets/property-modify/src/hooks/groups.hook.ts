import React from 'react';

import { context } from '../widget.context.tsx';

export const useGroups = () => {
  const { controller } = React.useContext(context);

  return controller.formStore.groups;
};
