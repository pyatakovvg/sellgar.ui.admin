import React from 'react';

import { context } from '../module.context.ts';

export const useGetData = () => {
  const { presenter } = React.useContext(context);

  return {
    currentFolder: presenter.getCurrentFolderData(),
    folders: presenter.getFoldersData(),
    files: presenter.getFileData(),
  };
};
