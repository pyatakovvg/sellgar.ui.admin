import React from 'react';
import * as Floating from '@floating-ui/react';

import { useDialogContext } from '../../hooks/use-dialog-context.hook.ts';

interface IProps {
  ref?: React.RefCallback<HTMLElement> | React.RefObject<HTMLElement>;
  asChild?: boolean;
}

export const Trigger: React.FC<React.PropsWithChildren<IProps>> = ({ children, asChild = false, ref, ...props }) => {
  const context = useDialogContext();
  const childrenRef = (children as any).ref;
  const currentRef = Floating.useMergeRefs([context.refs.setReference, ref, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (children && React.isValidElement(children)) {
    console.log(ref);
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(children.props as object),
        // @ts-ignore
        'data-state': context.open ? 'open' : 'closed',
      }),
    );
  }

  return (
    <button ref={currentRef} data-state={context.open ? 'open' : 'closed'} {...context.getReferenceProps(props)}>
      {children}
    </button>
  );
};
