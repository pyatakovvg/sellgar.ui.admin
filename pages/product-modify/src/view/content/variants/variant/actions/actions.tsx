import { Button } from '@sellgar/kit';
import { DeleteBin5LineIcon, FileCopyLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import { useVariant } from '../hooks/use-variant.hook.ts';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const variant = useVariant();

  return (
    <div className={s.wrapper}>
      <div className={s.action}>
        <Button.Icon
          type={'button'}
          size={'sm'}
          style={'ghost'}
          leadIcon={<FileCopyLineIcon />}
          onClick={variant.copy}
        />
      </div>
      <div className={s.action}>
        <Button.Icon
          type={'button'}
          size={'sm'}
          style={'ghost'}
          target={'destructive'}
          disabled={!variant.canDelete}
          leadIcon={<DeleteBin5LineIcon />}
          onClick={variant.delete}
        />
      </div>
    </div>
  );
};
