import React from 'react';

export interface PropertyModifyWidgetProps {
  uuid?: string;
  onCancel(): void;
  onSuccess(): void;
}

export const context = React.createContext({} as PropertyModifyWidgetProps);
export const Provider = context.Provider;
