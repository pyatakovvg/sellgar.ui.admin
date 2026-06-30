import React from 'react';

import { context } from '../widget.context.ts';

export const useTheme = () => {
  return React.useContext(context).theme;
};
