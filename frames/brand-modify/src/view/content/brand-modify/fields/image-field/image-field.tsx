import { Form, ImageGallery, type ImageGalleryItem } from '@library/design';
import { FileServiceInterface } from '@library/domain';
import { Caption, Field, Label } from '@sellgar/kit';
import { useDependency } from '@sellgar/app';

import React from 'react';
import * as RHF from 'react-hook-form';

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
      id: image.imageUuid ?? 'image',
      src: image.imageUuid ? getFileImageUrl(image.imageUuid) : undefined,
      file: image.file,
      fileName: image.file?.name,
    },
  ];
};

export const ImageField: React.FC<ImageFieldProps> = (props) => {
  const fileService = useDependency(FileServiceInterface);
  const {
    field,
    fieldState: { error },
  } = RHF.useController({
    name: 'image',
    control: props.control,
    disabled: props.inProcess,
  });

  const getFileImageUrl = (imageUuid: string) => fileService.getPublicImageUrl(imageUuid);
  const items = toImageGalleryItems(field.value, getFileImageUrl);

  const handleSelect = (files: File[]) => {
    const file = files[0];

    if (!file) {
      return;
    }

    field.onChange({
      file,
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
