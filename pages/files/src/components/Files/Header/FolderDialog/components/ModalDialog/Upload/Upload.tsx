import { useQuery } from '@library/app';
import { Dialog } from '@library/kit';

import React from 'react';

import { Form } from './Form';

import { useUploadRequest } from '../../../../../../../hooks/upload-request.hook.ts';

import s from './default.module.scss';

export const Upload: React.FC = () => {
  const [query] = useQuery();
  const { setOpen } = Dialog.useDialogContext();

  const uploadRequest = useUploadRequest();

  const handleSubmit = async (data: any) => {
    await uploadRequest(data, query.folderUuid);
    setOpen(false);
  };

  return (
    <div className={s.wrapper}>
      <Form onSubmit={handleSubmit} />
    </div>
  );
};
