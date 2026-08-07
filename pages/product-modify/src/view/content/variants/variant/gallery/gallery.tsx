import { ImageGallery } from '@library/design';
import { FileServiceInterface } from '@library/domain';
import { useDependency } from '@sellgar/app';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import type { IFormData } from '../../../../schema.ts';

interface IProps {
  index: number;
}

export const Gallery: React.FC<IProps> = (props) => {
  const fileService = useDependency(FileServiceInterface);
  const { control, formState } = ReactHookForm.useFormContext<IFormData>();
  const fieldName = `variants.${props.index}.images` as const;
  const { append, fields, remove, move } = ReactHookForm.useFieldArray({
    control,
    name: fieldName,
  });

  const handleFiles = (files: File[]) => {
    if (!files.length) {
      return;
    }

    append(files.map((file) => ({ file, alt: null })));
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
        src: image.imageUuid ? fileService.getPublicImageUrl(image.imageUuid) : undefined,
        file: image.file,
        fileName: image.file?.name,
      }))}
      disabled={formState.isSubmitting}
      onSelect={handleFiles}
      onRemove={handleRemove}
      onReorder={handleReorder}
    />
  );
};
