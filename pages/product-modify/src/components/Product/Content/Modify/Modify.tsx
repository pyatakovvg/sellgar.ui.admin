import React from 'react';
import { observer } from 'mobx-react';

import { Form } from './Form';

import { CreateProductDto } from '../../../../classes/store/form/dto/create-product.dto.ts';

import { useGetParams } from '../../../../hooks/get-params.hook.ts';
import { useGetFormInProcess } from '../../../../hooks/get-form-in-process.hook.ts';
import { useFindProductByUuidRequest } from '../../../../hooks/find-product-by-uuid-request.hook.ts';

import s from './default.module.scss';

export const Modify = observer(() => {
  const params = useGetParams();

  const inProcess = useGetFormInProcess();
  const findProductByUuidRequest = useFindProductByUuidRequest();

  return (
    <div className={s.wrapper}>
      <Form
        defaultValues={async () => {
          if (params.uuid) {
            const result = await findProductByUuidRequest(params.uuid);
            if (result) {
              return result;
            }
          }
          return new CreateProductDto();
        }}
        inProcess={inProcess}
      />
    </div>
  );
});
