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
  const { fields, remove, replace } = ReactHookForm.useFieldArray({
    control,
    name: `variants.${props.index}.images`,
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

  const handleItemClick = (id: string) => {
    const index = fields.findIndex((field) => field.id === id);

    if (index <= 0) {
      return;
    }

    const currentImages = fields.map(({ id, ...image }) => image);
    const [selectedImage] = currentImages.splice(index, 1);

    if (!selectedImage) {
      return;
    }

    replace(
      [selectedImage, ...currentImages].map((image, order) => ({
        ...image,
        order,
      })),
    );
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
      onItemClick={handleItemClick}
    />
  );
};
