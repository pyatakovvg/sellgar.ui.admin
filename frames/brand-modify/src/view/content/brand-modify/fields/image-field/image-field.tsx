import { Form, ImageGallery, type ImageGalleryItem } from '@library/design';
import { FileServiceInterface } from '@library/domain';
import { Caption, Field, Label } from '@sellgar/kit';
import { useDependency } from '@sellgar/app/react';

import React from 'react';
import * as RHF from 'react-hook-form';

import * as FS from '../../form.schema.ts';

interface IProps {
  control: RHF.Control<FS.IFormData>;
  inProcess: boolean;
}

const toImageGalleryItems = (
  images: FS.IFormData['images'],
  getFileImageUrl: (imageUuid: string) => string,
): ImageGalleryItem[] => {
  return images.map((image, index) => ({
    id: image.imageUuid ?? `new-${index}`,
    src: image.imageUuid ? getFileImageUrl(image.imageUuid) : undefined,
    file: image.file,
    fileName: image.file?.name ?? ('fileName' in image ? String(image.fileName) : undefined),
  }));
};

export const ImageField: React.FC<IProps> = (props) => {
  const fileService = useDependency(FileServiceInterface);
  const {
    field,
    fieldState: { error },
  } = RHF.useController({
    name: 'images',
    control: props.control,
    disabled: props.inProcess,
  });

  const getFileImageUrl = (imageUuid: string) => fileService.getPublicImageUrl(imageUuid);
  const items = toImageGalleryItems(field.value ?? [], getFileImageUrl);

  const handleSelect = (files: File[]) => {
    field.onChange([...(field.value ?? []), ...files.map((file) => ({ file }))]);
  };

  const handleRemove = (id: string) => {
    const images = field.value ?? [];
    const index = images.findIndex((image, imageIndex) => (image.imageUuid ?? `new-${imageIndex}`) === id);
    field.onChange(index < 0 ? images : images.filter((_image, imageIndex) => imageIndex !== index));
  };

  const handleReorder = (event: { ids: string[] }) => {
    const images = field.value ?? [];
    const byId = new Map(images.map((image, index) => [image.imageUuid ?? `new-${index}`, image]));
    field.onChange(event.ids.map((id, index) => ({ ...byId.get(id), sortOrder: index })));
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
              disabled={props.inProcess}
              onSelect={handleSelect}
              onRemove={handleRemove}
              onReorder={handleReorder}
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
