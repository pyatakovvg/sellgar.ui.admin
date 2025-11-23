import { Typography, Icon, Image, Button } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import type { IFormData } from '../../../../schema.ts';

import s from './gallery.module.scss';

interface IProps {
  index: number;
}

export const Gallery: React.FC<IProps> = (props) => {
  const { control } = ReactHookForm.useFormContext<IFormData>();
  const { fields, append, remove } = ReactHookForm.useFieldArray({
    control,
    name: `variants.${props.index}.images`,
  });

  const handleAdd = () => {
    const input = document.createElement('input');

    input.style.display = 'none';
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('name', 'file');
    input.setAttribute('multiple', 'multiple');

    input.onchange = () => {
      Array.from(input?.files ?? []).forEach((file) => {
        append({
          file,
          preview: URL.createObjectURL(file),
        });
      });

      input.onchange = null;
      input.oncancel = null;
    };

    input.oncancel = () => {
      input.onchange = null;
      input.oncancel = null;
    };

    input.click();
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {fields.map((file, index) => {
          return (
            <div key={file.id} className={s.image}>
              <span className={s.remove} onClick={() => handleRemove(index)}>
                <Button
                  shape={'pill'}
                  size={'xs'}
                  target={'destructive'}
                  style={'secondary'}
                  form={'icon'}
                  leadIcon={<Icon icon={Icon.deleteBin5Line} />}
                />
              </span>
              <Image className={s.img} src={file.preview} />
            </div>
          );
        })}
        <div className={s.add} onClick={() => handleAdd()}>
          <Icon icon={Icon.imageAddLine} />
        </div>
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
