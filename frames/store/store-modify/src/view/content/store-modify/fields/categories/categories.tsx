import { reactive, useController } from '@sellgar/app/react';
import { Button, Caption, Field, Label, NewSelect } from '@sellgar/kit';
import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { CategoryListControllerInterface } from '../../../../../classes/controller/category-list/category-list-controller.interface.ts';
import type { IFormData } from '../../form.schema.ts';

const CategoriesView: React.FC = () => {
  const { control } = useFormContext<IFormData>();
  const shopUuid = useWatch({ control, name: 'shopUuid' });
  const categories = useController(CategoryListControllerInterface);
  const options = categories.options;
  const loading = categories.loading;
  const loadError = categories.error;

  return (
    <Controller
      name={'categoryUuids'}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Label>
            <Label label={'Категории'} />
          </Field.Label>
          <Field.Content>
            <NewSelect.Multiple.Tree
              ref={field.ref}
              aria-label={'Категории'}
              options={options}
              resolveKey={(category) => category.uuid}
              resolveValue={(category) => category.name}
              resolveChildren={(category) => category.children}
              value={field.value}
              disabled={field.disabled || !shopUuid || loading || Boolean(loadError)}
              defaultExpanded={false}
              selectAllText={'Все категории'}
              placeholder={loading ? 'Загрузка категорий…' : 'Выберите категории'}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </Field.Content>
          <Field.Caption>
            <Caption
              state={error || loadError ? 'destructive' : undefined}
              caption={
                error?.message ??
                loadError ??
                (!shopUuid
                  ? 'Сначала выберите магазин.'
                  : loading
                    ? 'Загружаем дерево категорий магазина.'
                    : options.length === 0
                      ? 'У этого магазина пока нет категорий.'
                      : 'Можно выбрать несколько конечных категорий. Ветка выбирает все дочерние категории.')
              }
            />
          </Field.Caption>
          {loadError && (
            <Button
              type={'button'}
              size={'sm'}
              style={'secondary'}
              onClick={() => {
                void categories.load(shopUuid);
              }}
            >
              Повторить загрузку
            </Button>
          )}
        </Field>
      )}
    />
  );
};

export const Categories = reactive(CategoriesView);
