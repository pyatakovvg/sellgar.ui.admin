import { Form, ImageGallery } from '@library/design';
import { CreateBrandDto } from '@library/domain';
import { useController } from '@tiyn/app';
import { Caption, Field, Input, Label, Textarea } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { BrandModifyControllerInterface } from '../../../../classes/controller/brand-modify-controller.interface.ts';

import type { IFormData } from '../form.schema.ts';

import s from './default.module.scss';

interface FieldsProps {
  inProcess: boolean;
}

export const Fields: React.FC<FieldsProps> = (props) => {
  const controller = useController(BrandModifyControllerInterface);
  const { control } = useFormContext<IFormData>();

  return (
    <div className={s.wrapper}>
      <Controller
        name={'image'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => {
          const image = field.value as CreateBrandDto['image'] | undefined;
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
                  <Label label={'Наименование'} />
                </Field.Label>
                <Field.Content>
                  <Input
                    {...field}
                    target={error?.message ? 'destructive' : undefined}
                    size={'md'}
                    placeholder={'Наименование'}
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
