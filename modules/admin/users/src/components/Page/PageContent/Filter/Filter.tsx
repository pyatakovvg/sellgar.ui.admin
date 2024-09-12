import React from 'react';

import { useSearchParams } from '@/hooks/useSearchParams.ts';

import { FilterForm } from './FilterForm';

import s from './default.module.scss';

const defaultFilter = {
  roles: [],
  isBlocked: null,
};

const normalizeValues = (values: any) => {
  return {
    ...defaultFilter,
    ...values,
    roles: values.roles ? (values.roles instanceof Array ? values.roles : [values.roles]) : [],
  };
};

const normalizeSearch = (values: any) => {
  const result: any = {};

  if (values.roles.length) {
    result.roles = values.roles;
  }

  if (values.isBlocked) {
    result.isBlocked = values.isBlocked;
  }

  return result;
};

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={s.wrapper}>
      <FilterForm
        initialValues={normalizeValues(searchParams)}
        onSubmit={async (values = {}) => {
          const search = normalizeSearch(values);

          setSearchParams(search);
        }}
      />
    </div>
  );
};
