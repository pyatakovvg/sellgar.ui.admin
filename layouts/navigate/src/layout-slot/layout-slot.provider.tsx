import React from 'react';

import { layoutSlotContext } from './layout-slot.context.ts';

export const LayoutSlotProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [node, setNode] = React.useState<HTMLElement | null>(null);

  return <layoutSlotContext.Provider value={{ node, setNode }}>{props.children}</layoutSlotContext.Provider>;
};
