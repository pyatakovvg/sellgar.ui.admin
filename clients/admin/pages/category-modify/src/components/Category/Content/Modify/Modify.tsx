import { useNavigate } from '@library/app';
import { CategoryEntity } from '@library/domain';
import { useChangeBreadcrumb } from '@library/breadcrumbs';

import React from 'react';

import { Form } from './Form';

import { useGetCategoryData } from '../../../../hooks/get-category-data.hook.ts';
import { useGetFormInProcess } from '../../../../hooks/get-form-in-process.hook.ts';
import { useCreateCategoryRequest } from '../../../../hooks/create-category-request.hook.ts';
import { useUpdateCategoryRequest } from '../../../../hooks/update-category-request.hook.ts';

export const Modify = () => {
  const navigate = useNavigate();
  const changeBreadcrumb = useChangeBreadcrumb();

  const data = useGetCategoryData();
  const inProcess = useGetFormInProcess();
  const updateCategoryRequest = useUpdateCategoryRequest();
  const createCategoryRequest = useCreateCategoryRequest();

  React.useEffect(() => {
    if (data) {
      changeBreadcrumb('CATEGORY_MODIFY', data.name);
    }
  }, [data]);

  const handleSubmit = async (data: CategoryEntity) => {
    if (data.uuid) {
      await updateCategoryRequest(data);
    } else {
      await createCategoryRequest(data);
    }
    navigate('/categories');
  };

  return <Form defaultValues={data} inProcess={inProcess} onSubmit={handleSubmit} />;
};
