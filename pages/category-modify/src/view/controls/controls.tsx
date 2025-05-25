import { Button, Icon } from '@sellgar/kit';
import { CreateCategoryDto, UpdateCategoryDto } from '@library/domain';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import { context } from '../../module.context.ts';
import { useInProcess } from '../../hooks/in-process.hook.ts';
import { useCreateCategoryRequest } from '../../hooks/create-category-request.hook.ts';
import { useUpdateCategoryRequest } from '../../hooks/update-category-request.hook.ts';

export const Controls = () => {
  const { presenter } = React.useContext(context);
  const navigate = useNavigate();
  const { handleSubmit } = useFormContext();

  const inProcess = useInProcess();
  const handleCreate = useCreateCategoryRequest();
  const handleUpdate = useUpdateCategoryRequest();

  const onSubmit = handleSubmit(
    async (data) => {
      if (data.uuid) {
        await presenter.update(data.uuid, data as UpdateCategoryDto);
      } else {
        await presenter.create(data as CreateCategoryDto);
      }

      navigate('/categories');
    },
    (error) => {
      console.log(54335534, error);
    },
  );

  return (
    <Button type={'submit'} leadIcon={<Icon icon={'upload-line'} />} disabled={inProcess} onClick={onSubmit}>
      Сохранить
    </Button>
  );
};
