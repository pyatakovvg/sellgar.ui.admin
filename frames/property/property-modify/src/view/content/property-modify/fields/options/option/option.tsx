import { reactive, useLoaderData } from '@sellgar/app/react';
import { PropertyModifyControllerInterface } from '../../../../../../classes/controller/property-modify/property-modify-controller.interface.ts';
import { Button } from '@sellgar/kit';
import { DeleteBin5LineIcon, DotsOutLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as Motion from 'framer-motion';
import { useFormContext, useWatch } from 'react-hook-form';

import type { IFormData } from '../../../form.schema.ts';
import { Metadata } from './metadata';

import { Code } from './code';
import { Name } from './name';
import s from './default.module.scss';

interface IProps {
  fieldId: string;
  index: number;
  inProcess: boolean;
  persisted: boolean;
  onDelete: () => void;
}

export const Option: React.FC<IProps> = reactive((props) => {
  const { control } = useFormContext<IFormData>();
  const property = useLoaderData(PropertyModifyControllerInterface);
  const code = useWatch({ control, name: `options.${props.index}.code` });
  const persisted = props.persisted || Boolean(property?.options.some((option) => option.code === code));
  const y = Motion.useMotionValue(0);
  const dragControls = Motion.useDragControls();

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
      <div className={s.content}>
        <div
          className={s.drag}
          onPointerDown={(event) => {
            if (!props.inProcess) dragControls.start(event);
          }}
        >
          <DotsOutLineIcon />
        </div>
        <Code index={props.index} inProcess={props.inProcess} persisted={persisted} />
        <Name index={props.index} inProcess={props.inProcess} />
        <div className={s.control}>
          <Button.Icon
            type={'button'}
            shape={'rounded'}
            size={'xs'}
            style={'ghost'}
            target={'destructive'}
            leadIcon={<DeleteBin5LineIcon />}
            disabled={props.inProcess || persisted}
            onClick={props.onDelete}
            aria-label={'Удалить опцию'}
          />
        </div>
      </div>

      <Metadata optionIndex={props.index} inProcess={props.inProcess} />
    </Motion.Reorder.Item>
  );
});
