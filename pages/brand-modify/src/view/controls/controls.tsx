import { CreateBrandDto, UpdateBrandDto } from '@library/domain';

import { Button, Icon } from '@sellgar/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import { useInProcess } from '../../hooks/in-process.hook.ts';
import { useCreateBrandRequest } from '../../hooks/create-brand-request.hook.ts';
import { useUpdateBrandRequest } from '../../hooks/update-brand-request.hook.ts';

export const Controls = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useFormContext();

  const inProcess = useInProcess();
  const handleCreate = useCreateBrandRequest();
  const handleUpdate = useUpdateBrandRequest();

  const onSubmit = handleSubmit(async (data) => {
    if (data.uuid) {
      await handleUpdate(data.uuid, data as UpdateBrandDto);
    } else {
      await handleCreate(data as CreateBrandDto);
    }

    navigate('/brands');
  });

  return (
    <Button type={'submit'} leadIcon={<Icon icon={'upload-line'} />} disabled={inProcess} onClick={onSubmit}>
      Сохранить
    </Button>
  );
};
