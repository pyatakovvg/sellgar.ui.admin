import { Form, ImageGallery } from '@library/design';
import { CategoryEntity, CreateCategoryInput } from '@library/domain';
import { Caption, Field, Input, Label, Select, Textarea } from '@sellgar/kit';
import { useController, useLoaderData } from '@sellgar/app';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { CategoryListControllerInterface } from '../../../../classes/controller/category-list-controller.interface.ts';
import { CategoryModifyControllerInterface } from '../../../../classes/controller/category-modify-controller.interface.ts';
import type { IFormData } from '../form.schema.ts';

import s from './default.module.scss';

interface FieldsProps {
  inProcess: boolean;
}

type CategoryOption = CategoryEntity & {
  label: string;
};

const flattenCategories = (items: CategoryEntity[], excludedUuid?: string, level = 0): CategoryOption[] => {
  return items.flatMap((item) => {
    if (item.uuid === excludedUuid) {
      return [];
    }

    const children = flattenCategories(item.children ?? [], excludedUuid, level + 1);

    return [
      {
        ...item,
        label: `${'  '.repeat(level)}${item.name}`,
      },
      ...children,
    ];
  });
};

export const Fields: React.FC<FieldsProps> = (props) => {
  const controller = useController(CategoryModifyControllerInterface);
  const category = useLoaderData(CategoryModifyControllerInterface) as CategoryEntity | undefined;
  const categories = useLoaderData(CategoryListControllerInterface) as CategoryEntity[];
  const { control } = useFormContext<IFormData>();

  const categoryOptions = React.useMemo(
    () => flattenCategories(categories, category?.uuid),
    [categories, category?.uuid],
  );

  return (
    <div className={s.wrapper}>
      <Controller
        name={'image'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => {
          const image = field.value as CreateCategoryInput['image'] | undefined;
          const items = image
            ? [
                {
                  id: image.localId ?? image.imageUuid ?? 'image',
                  src: image.imageUuid ? controller.getFileImageUrl(image.imageUuid) : undefined,
                  file: image.file,
                  fileName: image.fileName,
                },
              ]
            : [];

          return (
            <Form.Fields>
              <Form.Fields.Field>
                <Field>
                  <Field.Label>
                    <Label label={'Изображение'} />
                  </Field.Label>
                  <Field.Content>
                    <ImageGallery
                      items={items}
                      multiple={false}
                      disabled={props.inProcess}
                      onSelect={(files) => {
                        const file = files[0];

                        if (!file) {
                          return;
                        }

                        field.onChange({
                          localId: globalThis.crypto.randomUUID(),
                          file,
                          fileName: file.name,
                          alt: null,
                        });
                      }}
                      onRemove={() => field.onChange(null)}
                    />
                  </Field.Content>
                  {error?.message && (
                    <Field.Caption>
                      <Caption state={'destructive'} caption={error.message} />
                    </Field.Caption>
                  )}
                </Field>
              </Form.Fields.Field>
            </Form.Fields>
          );
        }}
      />
      <Controller
        name={'parentUuid'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Родительская категория'} />
                </Field.Label>
                <Field.Content>
                  <Select
                    target={error?.message ? 'destructive' : undefined}
                    isClearable={true}
                    placeholder={'Родительская категория'}
                    optionKey={'uuid'}
                    optionValue={'label'}
                    value={field.value ?? undefined}
                    options={categoryOptions}
                    onChange={(value) => field.onChange(value || undefined)}
                    onBlur={field.onBlur}
                  />
                </Field.Content>
                {error?.message && (
                  <Field.Caption>
                    <Caption state={'destructive'} caption={error.message} />
                  </Field.Caption>
                )}
              </Field>
            </Form.Fields.Field>
          </Form.Fields>
        )}
      />
      <Controller
        name={'code'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Код'} />
                </Field.Label>
                <Field.Content>
                  <Input
                    {...field}
                    autoFocus={true}
                    target={error?.message ? 'destructive' : undefined}
                    size={'md'}
                    placeholder={'Код'}
                  />
                </Field.Content>
                {error?.message && (
                  <Field.Caption>
                    <Caption state={'destructive'} caption={error.message} />
                  </Field.Caption>
                )}
              </Field>
            </Form.Fields.Field>
          </Form.Fields>
        )}
      />
      <Controller
        name={'name'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Название'} />
                </Field.Label>
                <Field.Content>
                  <Input
                    {...field}
                    target={error?.message ? 'destructive' : undefined}
                    size={'md'}
                    placeholder={'Название'}
                  />
                </Field.Content>
                {error?.message && (
                  <Field.Caption>
                    <Caption state={'destructive'} caption={error.message} />
                  </Field.Caption>
                )}
              </Field>
            </Form.Fields.Field>
          </Form.Fields>
        )}
      />
      <Controller
        name={'description'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Описание'} />
                </Field.Label>
                <Field.Content>
                  <Textarea
                    {...field}
                    target={error?.message ? 'destructive' : undefined}
                    size={'md'}
                    placeholder={'Описание'}
                  />
                </Field.Content>
                {error?.message && (
                  <Field.Caption>
                    <Caption state={'destructive'} caption={error.message} />
                  </Field.Caption>
                )}
              </Field>
            </Form.Fields.Field>
          </Form.Fields>
        )}
      />
    </div>
  );
};
