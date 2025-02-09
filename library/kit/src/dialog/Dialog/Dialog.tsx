import React from 'react';

import { Close } from './components/Close';
import { Trigger } from './components/Trigger';
import { Content } from './components/Content';

import { Provider } from './dialog.context.ts';

import { useDialog } from './hooks/use-dialog.hook.ts';
import { useDialogContext } from './hooks/use-dialog-context.hook.ts';

export interface IProps {
  initialOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
}

const DialogComponent: React.FC<React.PropsWithChildren<IProps>> = ({ children, ...options }) => {
  const dialog = useDialog(options);

  return <Provider value={dialog}>{children}</Provider>;
};

type TDialog = typeof DialogComponent & {
  Close: typeof Close;
  Trigger: typeof Trigger;
  Content: typeof Content;
  useDialogContext: typeof useDialogContext;
};

export const Dialog: TDialog = Object.assign(DialogComponent, {
  Close,
  Trigger,
  Content,
  useDialogContext,
});
