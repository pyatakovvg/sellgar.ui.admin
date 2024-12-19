import { Icon, Link } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  bucket: any;
}

export const Bucket: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.icon}>
          <Icon icon={'delete'} />
        </div>
        <div className={s.name}>
          <Link href={'/buckets/' + props.bucket.uuid}>{props.bucket.name}</Link>
        </div>
      </div>
    </div>
  );
};
