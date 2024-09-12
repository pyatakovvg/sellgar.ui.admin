import { Actions } from '@library/design';
import { Icon, Link } from '@library/kit';
import { BucketEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  bucket: BucketEntity;
}

export const Bucket: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.icon}>
          <Icon icon={'database'} />
        </div>
        <div className={s.name}>
          <Link href={'/buckets/' + props.bucket.uuid}>{props.bucket.name}</Link>
        </div>
      </div>
      <div className={s.control}>
        <Actions onDelete={() => {}} />
      </div>
    </div>
  );
};
