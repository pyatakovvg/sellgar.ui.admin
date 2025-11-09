import React from 'react';

import { context } from '../widget.context.tsx';

export const useUnits = () => {
  const { controller } = React.useContext(context);

  return controller.formStore.units;
};
