// import { useQuery } from '@library/app';
// import { Modal } from '@sellgar/kit';

import React from 'react';

import { Form } from './Form';

// import { useUploadRequest } from '../../../../../../../hooks/upload-request.hook.ts';

import s from './default.module.scss';

export const Upload: React.FC = () => {
  // const [query] = useQuery();
  //
  // const uploadRequest = useUploadRequest();

  const handleSubmit = async () => {};

  return (
    <div className={s.wrapper}>
      <Form onSubmit={handleSubmit} />
    </div>
  );
};
