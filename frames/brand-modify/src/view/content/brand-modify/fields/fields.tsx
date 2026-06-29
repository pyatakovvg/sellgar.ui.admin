import { Form } from '@library/design';
import { CreateBrandDto } from '@library/domain';
import { useController } from '@tiyn/app';
import { Button, Caption, Field, Icon, Image, Input, Label, Textarea } from '@sellgar/kit';

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
  const { control, setValue, watch } = useFormContext<IFormData>();
  const image = watch('image') as CreateBrandDto['image'] | undefined;
  const objectUrl = React.useMemo(() => (image?.file ? URL.createObjectURL(image.file) : undefined), [image?.file]);
  const src = objectUrl ?? (image?.imageUuid ? controller.getFileImageUrl(image.imageUuid) : undefined);

  React.useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setValue(
      'image',
      {
        localId: globalThis.crypto.randomUUID(),
        file,
        fileName: file.name,
        alt: null,
      },
      { shouldDirty: true, shouldValidate: true },
    );
    event.target.value = '';
  };

  const handleImageRemove = () => {
    setValue('image', null, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div className={s.wrapper}>
      <Form.Fields>
        <Form.Fields.Field>
          <Field>
            <Field.Label>
              <Label label={'Изображение'} />
            </Field.Label>
            <Field.Content>
              <div className={s.imageControl}>
                {src ? (
                  <div className={s.preview}>
                    <Image className={s.previewImage} src={src} />
                    <Button
                      type={'button'}
                      shape={'pill'}
                      size={'xs'}
                      target={'destructive'}
                      style={'secondary'}
                      form={'icon'}
                      leadIcon={<Icon icon={Icon.deleteBin5Line} />}
                      onClick={handleImageRemove}
                      disabled={props.inProcess}
                    />
                  </div>
                ) : (
                  <label className={s.addImage}>
                    <input className={s.fileInput} type={'file'} accept={'image/*'} onChange={handleImageChange} disabled={props.inProcess} />
                    <Icon icon={Icon.imageAddLine} />
                  </label>
                )}
                {src && (
                  <label className={s.replaceImage}>
                    <input className={s.fileInput} type={'file'} accept={'image/*'} onChange={handleImageChange} disabled={props.inProcess} />
                    <Icon icon={Icon.imageAddLine} />
                  </label>
                )}
              </div>
            </Field.Content>
          </Field>
        </Form.Fields.Field>
      </Form.Fields>
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
                  <Input {...field} autoFocus={true} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Код'} />
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
                  <Input {...field} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Наименование'} />
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
                  <Textarea {...field} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Описание'} />
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
