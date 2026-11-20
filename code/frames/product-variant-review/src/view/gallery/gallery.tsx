import React from 'react';
import * as App from '@sellgar/app/react';
import { FileServiceInterface } from '@library/domain';
import { Image } from '@sellgar/kit';
import { VariantReviewControllerInterface } from '../../classes/controller/variant-review/variant-review-controller.interface.ts';
import s from './default.module.css';

const GalleryComponent: React.FC = () => {
  const variant = App.useLoaderData(VariantReviewControllerInterface);
  const files = App.useDependency(FileServiceInterface);
  return (
    <div className={s.wrapper}>
      {variant.images.map((image) => (
        <div key={image.imageUuid} className={s.image}>
          <Image src={files.getPublicImageUrl(image.imageUuid)} aria-label={image.fileName || variant.name} />
        </div>
      ))}
    </div>
  );
};
export const Gallery = App.reactive(GalleryComponent);
