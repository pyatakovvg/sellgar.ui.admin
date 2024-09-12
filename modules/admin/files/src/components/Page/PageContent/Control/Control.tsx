import { FileLoader } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Control = () => {
  const handleChange = (files: File[]) => {
    console.log(1, files);
  };

  const handleError = (files: any) => {
    console.log(2, files);
  };

  return (
    <div className={s.wrapper}>
      <FileLoader mimeType={['image/jpeg']} onChange={handleChange} onFail={handleError} />
    </div>
  );
};
