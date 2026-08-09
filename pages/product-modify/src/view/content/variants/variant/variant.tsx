import React from 'react';

import { VariantContext } from './context/variant.context.ts';
import { Actions } from './actions';
import { Gallery } from './gallery';
import { Fields } from './fields';

import s from './default.module.scss';

interface IProps {
  index: number;
  canDelete: boolean;
  onCopy(): void;
  onDelete(): void;
}

export const Variant: React.FC<IProps> = (props) => {
  const contextValue = React.useMemo(
    () => ({
      index: props.index,
      canDelete: props.canDelete,
      copy: props.onCopy,
      delete: props.onDelete,
    }),
    [props.canDelete, props.index, props.onCopy, props.onDelete],
  );

  return (
    <VariantContext.Provider value={contextValue}>
      <div className={s.wrapper}>
        <div className={s.actions}>
          <Actions />
        </div>
        <div className={s.gallery}>
          <Gallery />
        </div>
        <div className={s.content}>
          <Fields />
        </div>
      </div>
    </VariantContext.Provider>
  );
};
