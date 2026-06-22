import React from 'react';

export interface PropertyGroupModifyWidgetProps {
  uuid?: string;
  onCancel(): void;
  onSuccess(): void;
}

export const context = React.createContext({} as PropertyGroupModifyWidgetProps);
export const Provider = context.Provider;
