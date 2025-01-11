import React from 'react';

import { Icon } from '../../../../symbols/Icon';

import { useDialogContext } from '../../hooks/use-dialog-context.hook';

import s from './default.module.scss';

interface IProps {
  ref?: React.RefObject<HTMLDivElement> | React.RefCallback<HTMLDivElement>;
}

export const Close: React.FC<IProps> = ({ ref, ...props }) => {
  const { setOpen } = useDialogContext();

  const [_, startTransition] = React.useTransition();

  return (
    <div
      className={s.icon}
      {...props}
      ref={ref}
      onClick={() =>
        startTransition(() => {
          setOpen(false);
        })
      }
    >
      <Icon icon={'clear'} />
    </div>
  );
};
