import { useRequest } from '@library/app';

import React from 'react';

import { context } from '../module.context.ts';

export const useUploadRequest = () => {
  const { presenter } = React.useContext(context);

  return useRequest(async (data: any, folderUuid?: string) => {
    return await presenter.upload(data, folderUuid);
  });
};
