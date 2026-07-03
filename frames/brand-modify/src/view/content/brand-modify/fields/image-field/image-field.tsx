import { Form, ImageGallery, type ImageGalleryItem } from '@library/design';
import { Caption, Field, Label } from '@sellgar/kit';
import * as AppRuntime from '@tiyn/app';

import React from 'react';
import * as RHF from 'react-hook-form';

import { BrandModifyControllerInterface } from '../../../../../classes/controller/brand-modify-controller.interface.ts';

import * as FS from '../../form.schema.ts';

interface ImageFieldProps {
  control: RHF.Control<FS.IFormData>;
  inProcess: boolean;
}

const toImageGalleryItems = (
  image: FS.IFormData['image'],
  getFileImageUrl: (imageUuid: string) => string,
): ImageGalleryItem[] => {
  if (!image) {
    return [];
  }

  return [
    {
      id: image.localId ?? image.imageUuid ?? 'image',
      src: image.imageUuid ? getFileImageUrl(image.imageUuid) : undefined,
      file: image.file,
      fileName: image.fileName,
    },
  ];
};

export const ImageField: React.FC<ImageFieldProps> = (props) => {
  const controller = AppRuntime.useController(BrandModifyControllerInterface);
  const {
    field,
    fieldState: { error },
  } = RHF.useController({
    name: 'image',
    control: props.control,
    disabled: props.inProcess,
  });

  const getFileImageUrl = (imageUuid: string) => controller.getFileImageUrl(imageUuid);
  const items = toImageGalleryItems(field.value, getFileImageUrl);

  const handleSelect = (files: File[]) => {
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
  };

  const handleRemove = () => {
    field.onChange(null);
  };

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
              onSelect={handleSelect}
              onRemove={handleRemove}
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
};
