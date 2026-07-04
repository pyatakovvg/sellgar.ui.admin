import { ImageGallery } from '@library/design';
import { useController } from '@tiyn/app';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import type { IFormData } from '../../../../schema.ts';
import { ProductControllerInterface } from '../../../../../classes/controller/product-controller.interface.ts';

interface IProps {
  index: number;
}

export const Gallery: React.FC<IProps> = (props) => {
  const controller = useController(ProductControllerInterface);
  const { control } = ReactHookForm.useFormContext<IFormData>();
  const fieldName = `variants.${props.index}.images` as const;
  const { fields, remove, replace, move } = ReactHookForm.useFieldArray({
    control,
    name: fieldName,
  });

  const handleFiles = (files: File[]) => {
    if (!files.length) {
      return;
    }

    const currentImages = fields.map(({ id, ...image }) => image);
    replace(controller.addGalleryImages(currentImages, files));
  };

  const handleRemove = (id: string) => {
    const index = fields.findIndex((field) => field.id === id);

    if (index >= 0) {
      remove(index);
    }
  };

  const handleReorder = (event: { ids: string[]; sourceId: string }) => {
    const oldIndex = fields.findIndex((item) => item.id === event.sourceId);
    const newIndex = event.ids.findIndex((id) => id === event.sourceId);

    if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) {
      return;
    }

    move(oldIndex, newIndex);
  };

  return (
    <ImageGallery
      items={fields.map((image) => ({
        id: image.id,
        src: image.imageUuid ? controller.getFileImageUrl(image.imageUuid) : undefined,
        file: image.file,
        fileName: image.fileName,
      }))}
      onSelect={handleFiles}
      onRemove={handleRemove}
      onReorder={handleReorder}
    />
  );
};
