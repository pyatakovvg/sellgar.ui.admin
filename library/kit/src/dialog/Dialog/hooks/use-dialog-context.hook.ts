import React from 'react';

import { context } from '../dialog.context.ts';

export const useDialogContext = () => {
  const dialogContext = React.useContext(context);

  if (dialogContext == null) {
    throw new Error('Dialog components must be wrapped in <Dialog />');
  }

  return dialogContext;
};
