import React from 'react';

import { context } from '@/root/files.context.ts';

export const useFiles = () => {
  const { presenter } = React.useContext(context);

  return presenter.fileStore.files;
};
