import React from 'react';

export interface UnitModifyWidgetProps {
  uuid?: string;
  onCancel(): void;
  onSuccess(): void;
}

export const context = React.createContext({} as UnitModifyWidgetProps);
export const Provider = context.Provider;
