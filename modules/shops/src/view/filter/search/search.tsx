import { useLoaderData, useSubmit } from '@sellgar/app/react';

import React from 'react';
import * as ReactHF from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Form } from './form';

import { schema } from './form.schema.ts';
import { SearchFormData } from './form.types.ts';

import { SearchControllerInterface } from '../../../classes/controller/search/search-controller.interface.ts';

import s from './default.module.scss';

export const Search: React.FC = () => {
  const search = useLoaderData(SearchControllerInterface);
  const submit = useSubmit(SearchControllerInterface);

  const methods = ReactHF.useForm<SearchFormData>({
    values: {
      term: search.term ?? '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = methods.handleSubmit(async (value) => {
    await submit(value);
  });

  return (
    <ReactHF.FormProvider {...methods}>
      <form className={s.wrapper} onSubmit={handleSubmit}>
        <Form />
      </form>
    </ReactHF.FormProvider>
  );
};
