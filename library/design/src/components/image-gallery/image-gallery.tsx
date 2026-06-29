import { Button, Image, Typography } from '@sellgar/kit';
import {
  DeleteBin5LineIcon,
  ImageAddLineIcon,
  ImageEditLineIcon,
  ImageLineIcon,
} from '@sellgar/kit/icons';

import React from 'react';

import s from './image-gallery.module.scss';

export interface ImageGalleryItem {
  id: string;
  src?: string;
  file?: File;
  fileName?: string | null;
  primary?: boolean;
}

interface ImageGalleryProps {
  items: ImageGalleryItem[];
  disabled?: boolean;
  multiple?: boolean;
  onSelect: (files: File[]) => void;
  onRemove: (id: string) => void;
}

const Preview: React.FC<{ item: ImageGalleryItem }> = (props) => {
  const [objectUrl, setObjectUrl] = React.useState<string>();

  React.useEffect(() => {
    if (!props.item.file) {
      setObjectUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(props.item.file);

    setObjectUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [props.item.file]);

  const src = objectUrl ?? props.item.src;

  if (src) {
    return <Image className={s.img} src={src} />;
  }

  return (
    <div className={s.pending}>
      <ImageLineIcon />
      <Typography size={'caption-s'}>
        <span className={s.pendingName}>{props.item.fileName}</span>
      </Typography>
    </div>
  );
};

export const ImageGallery: React.FC<ImageGalleryProps> = (props) => {
  const multiple = props.multiple ?? true;
  const hasItems = props.items.length > 0;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onSelect(Array.from(event.target.files ?? []));
    event.target.value = '';
  };

  const handleSelectClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    props.onRemove(id);
  };

  return (
    <div className={[s.wrapper, props.disabled ? s.disabled : undefined].filter(Boolean).join(' ')}>
      <div className={s.content}>
        {props.items.map((item) => (
          <div
            key={item.id}
            className={[s.image, item.primary ? s.primary : undefined].filter(Boolean).join(' ')}
          >
            <span className={s.remove} onClick={(event) => handleRemove(event, item.id)}>
              <Button
                shape={'pill'}
                size={'xs'}
                target={'destructive'}
                style={'secondary'}
                form={'icon'}
                leadIcon={<DeleteBin5LineIcon />}
              />
            </span>
            {item.primary && <span className={s.primaryMarker} />}
            <Preview item={item} />
          </div>
        ))}
        <button
          className={s.add}
          type={'button'}
          aria-label={multiple ? 'Добавить изображение' : 'Выбрать изображение'}
          disabled={props.disabled}
          onClick={handleSelectClick}
        >
          {multiple ? <ImageAddLineIcon /> : <ImageEditLineIcon />}
        </button>
        <input
          ref={inputRef}
          className={s.input}
          type={'file'}
          accept={'image/*'}
          multiple={multiple}
          disabled={props.disabled}
          tabIndex={-1}
          onChange={handleInputChange}
        />
        {!hasItems && (
          <div className={s.placeholder}>
            <Typography size={'caption-l'} weight={'semi-bold'}>
              <p className={s.header}>Добавление изображений</p>
            </Typography>
            <Typography size={'caption-s'}>
              <p className={s.description}>
                Перетащите файлы в эту область или воспользуйтесь кнопкой{' '}
                <ImageAddLineIcon className={s.contract} /> для выбора
              </p>
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
