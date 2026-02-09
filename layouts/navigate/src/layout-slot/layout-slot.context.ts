import React from 'react';

export interface LayoutSlotContextValue {
  node: HTMLElement | null;
  setNode: (node: HTMLElement | null) => void;
}

export const layoutSlotContext = React.createContext<LayoutSlotContextValue | null>(null);
