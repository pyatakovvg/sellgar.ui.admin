import { Button } from '@sellgar/kit';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export const Controls = () => {
  const { handleSubmit } = useFormContext();

  const onSubmit = handleSubmit((data) => {
    console.log(123132, data);
  });

  return (
    <Button type={'submit'} disabled={false} onClick={onSubmit}>
      Сохранить
    </Button>
  );
};
