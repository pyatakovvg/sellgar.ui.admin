import type { CategoryEntity } from '@library/domain';
import * as App from '@sellgar/app';
import { Caption, Field, Label, Select } from '@sellgar/kit';

import React from 'react';
import * as RHF from 'react-hook-form';

import { CategoryOptionsControllerInterface } from '../../../../../classes/controller/category-options/category-options-controller.interface.ts';
import type { IFormData } from '../../../../schema.ts';

type TCategoryOption = CategoryEntity & {
  label: string;
};

const flattenCategories = (items: CategoryEntity[], level = 0): TCategoryOption[] => {
  return items.flatMap((item) => [
    {
      ...item,
      label: `${'  '.repeat(level)}${item.name}`,
    },
    ...flattenCategories(item.children ?? [], level + 1),
  ]);
};

export const Category: React.FC = () => {
  const { control } = RHF.useFormContext<IFormData>();
  const categories = App.useLoaderData(CategoryOptionsControllerInterface);
  const categoryOptions = React.useMemo(() => flattenCategories(categories.data), [categories.data]);

  return (
    <RHF.Controller
      control={control}
      name={'categoryUuid'}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Label>
            <Label label={'Категория'} />
          </Field.Label>
          <Field.Content>
            <Select
              optionKey={'uuid'}
              optionValue={'label'}
              options={categoryOptions}
              target={error?.message ? 'destructive' : undefined}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </Field.Content>
          {error?.message ? (
            <Field.Caption>
              <Caption state={'destructive'} caption={error.message} />
            </Field.Caption>
          ) : null}
        </Field>
      )}
    />
  );
};
