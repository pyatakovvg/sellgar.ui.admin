import React from 'react';
import * as Floating from '@floating-ui/react';

import type { IProps } from '../Dialog.tsx';

export const useDialog = ({ initialOpen = false, isOpen: controlledOpen, onOpenChange: setControlledOpen }: IProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<string | undefined>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = Floating.useFloating({
    open,
    onOpenChange: setOpen,
  });

  const context = data.context;

  const click = Floating.useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = Floating.useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = Floating.useRole(context);

  const interactions = Floating.useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, labelId, descriptionId],
  );
};
