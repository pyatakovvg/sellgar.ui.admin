import { useNavigate, useLoaderData } from '@library/app';
import { BrandEntity, UnitEntity } from '@library/domain';
// import { useChangeBreadcrumb } from '@library/breadcrumbs';

import React from 'react';
import { observer } from 'mobx-react';

import { Form } from './form';

import { useGetFormInProcess } from '../../hooks/get-form-in-process.hook.ts';
import { useCreateBrandRequest } from '../../hooks/create-brand-request.hook.ts';
import { useUpdateBrandRequest } from '../../hooks/update-brand-request.hook.ts';

export const Content = observer(() => {
  const navigate = useNavigate();
  // const changeBreadcrumb = useChangeBreadcrumb();

  const data = useLoaderData<UnitEntity>();

  const inProcess = useGetFormInProcess();
  const updateBrandRequest = useUpdateBrandRequest();
  const createBrandRequest = useCreateBrandRequest();

  // React.useEffect(() => {
  //   if (data) {
  //     changeBreadcrumb('UNIT_MODIFY', data.name);
  //   }
  // }, [data]);

  const handleSubmit = async (data: BrandEntity) => {
    if (data.uuid) {
      await updateBrandRequest(data);
    } else {
      await createBrandRequest(data);
    }
    navigate('/units');
  };

  return <Form defaultValues={data ?? {}} inProcess={inProcess} onSubmit={handleSubmit} />;
});
