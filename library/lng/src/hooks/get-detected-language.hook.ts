import React from 'react';

import { context } from '../lng.context.ts';

export const useGetDetectedLanguage = () => {
  const { presenter } = React.useContext(context);

  return presenter.detectedLanguage();
};
