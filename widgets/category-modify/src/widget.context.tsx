import React from 'react';

export interface CategoryModifyWidgetProps {
  uuid?: string;
  onCancel(): void;
  onSuccess(): void;
}

export const context = React.createContext({} as CategoryModifyWidgetProps);
export const Provider = context.Provider;
