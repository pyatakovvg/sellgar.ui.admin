import { Typography, Icon, Image, Button } from '@sellgar/kit';
import { useController } from '@tiyn/app';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import type { IFormData } from '../../../../schema.ts';
import { ProductControllerInterface } from '../../../../../classes/controller/product-controller.interface.ts';

import s from './gallery.module.scss';

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(Array.from(event.target.files ?? []));
    event.target.value = '';
  };

  const handleRemove = async (event: React.MouseEvent, index: number) => {
    event.stopPropagation();

    remove(index);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {fields.map((file, index) => {
          const src = file.imageUuid ? controller.getFileImageUrl(file.imageUuid) : undefined;

          return (
            <div
              key={file.id}
              className={[s.image, index === 0 ? s.primary : undefined].filter(Boolean).join(' ')}
            >
              <span className={s.remove} onClick={(event) => handleRemove(event, index)}>
                <Button
                  shape={'pill'}
                  size={'xs'}
                  target={'destructive'}
                  style={'secondary'}
                  form={'icon'}
                  leadIcon={<Icon icon={Icon.deleteBin5Line} />}
                />
              </span>
              {index === 0 && <span className={s.primaryMarker} />}
              {src && <Image className={s.img} src={src} />}
              {!src && (
                <div className={s.pending}>
                  <Icon icon={Icon.imageLine} />
                  <Typography size={'caption-s'}>
                    <span className={s.pendingName}>{file.fileName}</span>
                  </Typography>
                </div>
              )}
            </div>
          );
        })}
        <label className={s.add}>
          <input
            className={s.input}
            type={'file'}
            aria-label={'Добавить изображение'}
            accept={'image/*'}
            multiple
            onChange={handleInputChange}
          />
          <Icon icon={Icon.imageAddLine} />
        </label>
        {!fields.length && (
          <div className={s.placeholder}>
            <Typography size={'caption-l'} weight={'semi-bold'}>
              <p className={s.header}>Добавление изображений</p>
            </Typography>
            <Typography size={'caption-s'}>
              <p className={s.description}>
                Перетащите файлы в эту область или воспользуйтесь кнопкой{' '}
                <Icon className={s.contract} icon={Icon.imageAddLine} /> для выбора
              </p>
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
