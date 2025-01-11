import React from 'react';

import { useDialog } from './hooks/use-dialog.hook.ts';

type ContextType =
  | (ReturnType<typeof useDialog> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
    })
  | null;

export const context = React.createContext<ContextType>(null);
export const Provider = context.Provider;
