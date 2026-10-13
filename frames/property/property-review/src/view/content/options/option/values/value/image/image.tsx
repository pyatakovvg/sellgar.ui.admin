import { FileServiceInterface, type PropertyEntity } from '@library/domain';
import { useDependency } from '@sellgar/app/react';
import { Image } from '@sellgar/kit';
import React from 'react';

interface IProps {
  value: PropertyEntity['options'][number]['extras'][number];
}
export const ImageValue: React.FC<IProps> = (props) => {
  const fileService = useDependency(FileServiceInterface);
  if (!props.value.imageUuid) return null;
  return (
    <Image
      width={64}
      height={64}
      src={fileService.getPublicImageUrl(props.value.imageUuid)}
      aria-label={'Изображение опции'}
    />
  );
};
