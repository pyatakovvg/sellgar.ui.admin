import { useNavigate } from '@library/app';
import { BrandEntity } from '@library/domain';

import React from 'react';
import { observer } from 'mobx-react';

import { Form } from './Form';

import { useGetBrandData } from '../../../../hooks/get-data.hook.ts';
import { useGetFormInProcess } from '../../../../hooks/get-form-in-process.hook.ts';
import { useCreateBrandRequest } from '../../../../hooks/create-brand-request.hook.ts';
import { useUpdateBrandRequest } from '../../../../hooks/update-brand-request.hook.ts';

export const Modify = observer(() => {
  const navigate = useNavigate();

  const data = useGetBrandData();
  const inProcess = useGetFormInProcess();
  const updateBrandRequest = useUpdateBrandRequest();
  const createBrandRequest = useCreateBrandRequest();

  const handleSubmit = async (data: BrandEntity) => {
    if (data.uuid) {
      await updateBrandRequest(data);
    } else {
      await createBrandRequest(data);
    }
    navigate('/brands');
  };

  return <Form defaultValues={data ?? {}} inProcess={inProcess} onSubmit={handleSubmit} />;
});
