import { ImageGallery } from '@library/design';
import * as App from '@sellgar/app/react';
import { Field, Label } from '@sellgar/kit';

import React from 'react';
import * as RHF from 'react-hook-form';

import { VariantModifyControllerInterface } from '../../../classes/controller/variant-modify/variant-modify-controller.interface.ts';
import type { VariantFormInput } from '../../../classes/controller/variant-modify/input/variant-form.input.ts';

export const Gallery: React.FC = () => {
  const loaderData = App.useLoaderData(VariantModifyControllerInterface);
  const { control, formState } = RHF.useFormContext<VariantFormInput>();
  const fieldName = 'images' as const;
  const { append, fields, remove, move } = RHF.useFieldArray({
    control,
    name: fieldName,
  });

  const handleFiles = (files: File[]) => {
    if (!files.length) {
      return;
    }

    append(files.map((file) => ({ file })));
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
            src: image.imageUuid ? loaderData.imageUrls[image.imageUuid] : undefined,
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
