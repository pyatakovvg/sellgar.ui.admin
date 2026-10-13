import { Button } from '@sellgar/kit';
import { DeleteBin5LineIcon, DotsOutLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as Motion from 'framer-motion';

import { Type } from './type';
import { Value } from './value';

import s from './default.module.scss';

interface IProps {
  fieldId: string;
  optionIndex: number;
  index: number;
  inProcess: boolean;
  onDelete: () => void;
}

export const Item: React.FC<IProps> = (props) => {
  const y = Motion.useMotionValue(0);
  const dragControls = Motion.useDragControls();
  const path = `options.${props.optionIndex}.metadata.${props.index}` as const;

  return (
    <Motion.Reorder.Item
      className={s.wrapper}
      as={'div'}
      id={props.fieldId}
      value={props.fieldId}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <div
        className={s.drag}
        onPointerDown={(event) => {
          if (!props.inProcess) dragControls.start(event);
        }}
      >
        <DotsOutLineIcon />
      </div>
      <Type optionIndex={props.optionIndex} index={props.index} inProcess={props.inProcess} />
      <div className={s.value}>
        <Value path={path} inProcess={props.inProcess} />
      </div>
      <div className={s.control}>
        <Button.Icon
          type={'button'}
          shape={'rounded'}
          size={'xs'}
          style={'ghost'}
          target={'destructive'}
          leadIcon={<DeleteBin5LineIcon />}
          disabled={props.inProcess}
          onClick={props.onDelete}
          aria-label={'Удалить визуальное значение'}
        />
      </div>
    </Motion.Reorder.Item>
  );
};
