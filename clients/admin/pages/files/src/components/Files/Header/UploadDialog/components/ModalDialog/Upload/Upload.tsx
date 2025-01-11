import { useQuery } from '@library/app';

import React from 'react';

import { Form } from './Form';

import { useUploadRequest } from '../../../../../../../hooks/upload-request.hook.ts';

interface IQuery {
  dirUuid?: string;
}

export const Upload: React.FC = () => {
  const upload = useUploadRequest();
  const [query] = useQuery<IQuery>();

  const handleSubmit = (data: any) => {
    upload(data, query.dirUuid);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
};
