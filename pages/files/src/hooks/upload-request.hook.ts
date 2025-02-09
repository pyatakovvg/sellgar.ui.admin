import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';

interface IData {
  files: File[];
  folderUuid?: string;
}

export const useUploadRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (data: IData) => {
    return await presenter.upload(data.files, data.folderUuid);
  });
};
