import { Form } from '@library/design';
import { CategoryEntity } from '@library/domain';
import { Input, Textarea, Field, Label, Caption, Select } from '@sellgar/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useFormContext, Controller } from 'react-hook-form';

import { useCategories } from '../../../hooks/categories.hook.ts';

import s from './default.module.scss';

type CategoryOption = CategoryEntity & {
  label: string;
};

const flattenCategories = (items: CategoryEntity[], excludedUuid?: string, level = 0): CategoryOption[] => {
  return items.flatMap((item) => {
    const children = flattenCategories(item.children ?? [], excludedUuid, level + 1);

    if (item.uuid === excludedUuid) {
      return children;
    }

    return [
      {
        ...item,
        label: `${'  '.repeat(level)}${item.name}`,
      },
      ...children,
    ];
  });
};

export const Content: React.FC = observer(() => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CategoryEntity>();

  const categories = useCategories();
  const categoryOptions = React.useMemo(() => flattenCategories(categories, undefined), [categories]);

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Form.Fields>
          <Form.Fields.Field>
            <Controller
              name={'parentUuid'}
              control={control}
              render={({ field }) => {
                return (
                  <Field>
                    <Field.Label>
                      <Label label={'Родительская категория'} />
                    </Field.Label>
                    <Field.Content>
                      <Select
                        target={errors.parentUuid?.message ? 'destructive' : undefined}
                        isClearable={true}
                        placeholder={'Родительская категория'}
                        optionKey={'uuid'}
                        optionValue={'label'}
                        value={field.value ?? undefined}
                        options={categoryOptions}
                        onChange={(value) => {
                          return field.onChange(value);
                        }}
                        onBlur={field.onBlur}
                      />
                    </Field.Content>
                    {errors.parentUuid?.message && (
                      <Field.Caption>
                        <Caption state={'destructive'} caption={errors.parentUuid.message} />
                      </Field.Caption>
                    )}
                  </Field>
                );
              }}
            />
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Код'} />
              </Field.Label>
              <Field.Content>
                <Input
                  {...register('code')}
                  autoFocus={true}
                  target={errors.code?.message ? 'destructive' : undefined}
                  placeholder={'Код'}
                />
              </Field.Content>
              {errors.name?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={errors.name.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Название'} />
              </Field.Label>
              <Field.Content>
                <Input
                  {...register('name')}
                  target={errors.name?.message ? 'destructive' : undefined}
                  placeholder={'Название'}
                />
              </Field.Content>
              {errors.name?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={errors.name.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Описание'} />
              </Field.Label>
              <Field.Content>
                <Textarea
                  {...register('description')}
                  target={errors.description?.message ? 'destructive' : undefined}
                  placeholder={'Описание'}
                />
              </Field.Content>
              {errors.description?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={errors.description.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
      </div>
    </div>
  );
});
