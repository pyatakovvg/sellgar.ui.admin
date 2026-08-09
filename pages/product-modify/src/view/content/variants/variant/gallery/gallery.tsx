import { ImageGallery } from '@library/design';
import { FileServiceInterface } from '@library/domain';
import * as App from '@sellgar/app';
import { Field, Label } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { useVariant } from '../hooks/use-variant.hook.ts';
import type { IFormData } from '../../../../schema.ts';

export const Gallery: React.FC = () => {
  const variant = useVariant();
  const fileService = App.useDependency(FileServiceInterface);
  const { control, formState } = ReactHookForm.useFormContext<IFormData>();
  const fieldName = `variants.${variant.index}.images` as const;
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
    <Field>
      <Field.Label>
        <Label label={'Изображение'} />
      </Field.Label>
      <Field.Content>
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
      </Field.Content>
    </Field>
  );
};
