import { useDependency, useLoaderData } from '@sellgar/app/react';
import { FileServiceInterface } from '@library/domain';
import { Image } from '@sellgar/kit';

import React from 'react';

import { Empty } from './empty';

import { BrandReviewControllerInterface } from '../../../classes/controller/brand-review/brand-review-controller.interface.ts';

import s from './default.module.scss';

export const Promo: React.FC = () => {
  const data = useLoaderData(BrandReviewControllerInterface);
  const fileService = useDependency(FileServiceInterface);
  const image = data.images[0];

  return (
    <section className={s.wrapper} aria-label={'Изображение бренда'}>
      {image ? (
        <div className={s.image}>
          <Image
            width={128}
            height={128}
            src={fileService.getPublicImageUrl(image.imageUuid)}
            aria-label={image.fileName || data.name}
          />
        </div>
      ) : (
        <Empty />
      )}
    </section>
  );
};
