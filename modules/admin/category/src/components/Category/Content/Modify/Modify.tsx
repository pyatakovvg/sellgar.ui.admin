import { CategoryEntity } from '@library/domain';
import { useChangeBreadcrumb } from '@library/breadcrumbs';

import React from 'react';

import { Form } from './Form';

import { useGetCategoryData } from '../../../../hooks/get-category-data.hook.ts';
import { useCreateCategoryRequest } from '../../../../hooks/create-category-request.hook.ts';
import { useUpdateCategoryRequest } from '../../../../hooks/update-category-request.hook.ts';

export const Modify = () => {
  const data = useGetCategoryData();
  const changeBreadcrumb = useChangeBreadcrumb();
  const updateCategoryRequest = useUpdateCategoryRequest();
  const createCategoryRequest = useCreateCategoryRequest();

  React.useEffect(() => {
    if (data) {
      changeBreadcrumb('CATEGORY_MODIFY', data.name);
    }
  }, [data]);

  const handleSubmit = (data: CategoryEntity) => {
    if (data.uuid) {
      updateCategoryRequest(data);
    } else {
      createCategoryRequest(data);
    }
  };

  return <Form defaultValues={data} inProcess={false} onSubmit={handleSubmit} />;
};
