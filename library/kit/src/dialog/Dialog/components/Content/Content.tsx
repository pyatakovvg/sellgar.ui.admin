import React from 'react';
import * as Floating from '@floating-ui/react';
import { FloatingPortal, FloatingOverlay, FloatingFocusManager } from '@floating-ui/react';

import { Underlay } from '../../../../symbols/Underlay';

import { useDialogContext } from '../../hooks/use-dialog-context.hook.ts';

import s from './default.module.scss';

interface IProps {
  ref?: React.RefObject<HTMLElement> | React.RefCallback<HTMLElement>;
}

export const Content: React.FC<React.PropsWithChildren<IProps>> = ({ ref, ...props }) => {
  const { context: floatingContext, ...context } = useDialogContext();
  const currentRef = Floating.useMergeRefs([context.refs.setFloating, ref]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay className={s.wrapper} lockScroll>
        <FloatingFocusManager context={floatingContext}>
          <div
            ref={currentRef}
            className={s.content}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
          >
            <Underlay>{props.children}</Underlay>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};
