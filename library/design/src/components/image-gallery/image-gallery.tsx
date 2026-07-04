import { move as moveItems } from '@dnd-kit/helpers';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { closestCenter } from '@dnd-kit/collision';
import { Button, Image, Typography } from '@sellgar/kit';
import {
  DeleteBin5LineIcon,
  DragMove2LineIcon,
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
}

interface ImageGalleryProps {
  items: ImageGalleryItem[];
  disabled?: boolean;
  multiple?: boolean;
  onSelect: (files: File[]) => void;
  onRemove: (id: string) => void;
  onReorder?: (event: { ids: string[]; sourceId: string }) => void;
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

interface ImageItemProps {
  item: ImageGalleryItem;
  index: number;
  sortable: boolean;
  onRemove: (event: React.MouseEvent, id: string) => void;
}

const ImageItem: React.FC<ImageItemProps> = (props) => {
  const sortable = useSortable({
    id: props.item.id,
    index: props.index,
    collisionDetector: closestCenter,
    disabled: !props.sortable,
  });

  return (
    <div
      ref={sortable.ref}
      className={[s.image, sortable.isDragging ? s.dragging : undefined, sortable.isDropTarget ? s.dropTarget : undefined]
        .filter(Boolean)
        .join(' ')}
    >
      {props.sortable && (
        <button
          ref={sortable.handleRef}
          className={s.dragHandle}
          type={'button'}
          aria-label={'Изменить порядок изображения'}
        >
          <DragMove2LineIcon />
        </button>
      )}
      <div className={s.remove}>
        <Button.Icon
          type={'button'}
          shape={'rounded'}
          size={'xs'}
          target={'destructive'}
          style={'ghost'}
          leadIcon={<DeleteBin5LineIcon />}
          onClick={(event) => props.onRemove(event, props.item.id)}
        />
      </div>
      <Preview item={props.item} />
    </div>
  );
};

export const ImageGallery: React.FC<ImageGalleryProps> = (props) => {
  const multiple = props.multiple ?? true;
  const hasItems = props.items.length > 0;
  const sortable = Boolean(props.onReorder && props.items.length > 1 && !props.disabled);
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

  const handleDragEnd = (event: DragEndEvent) => {
    if (!props.onReorder || event.operation.canceled) {
      return;
    }

    const { source } = event.operation;

    if (!source) {
      return;
    }

    const reorderedItems = moveItems(props.items, event);
    const reorderedIds = reorderedItems.map((item) => item.id);

    if (reorderedIds.some((id, index) => props.items[index]?.id !== id)) {
      props.onReorder({
        ids: reorderedIds,
        sourceId: String(source.id),
      });
    }
  };

  return (
    <div className={[s.wrapper, props.disabled ? s.disabled : undefined].filter(Boolean).join(' ')}>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className={s.content}>
          {props.items.map((item, index) => (
            <ImageItem key={item.id} item={item} index={index} sortable={sortable} onRemove={handleRemove} />
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
                  Перетащите файлы в эту область или воспользуйтесь кнопкой <ImageAddLineIcon className={s.contract} />{' '}
                  для выбора
                </p>
              </Typography>
            </div>
          )}
        </div>
      </DragDropProvider>
    </div>
  );
};
