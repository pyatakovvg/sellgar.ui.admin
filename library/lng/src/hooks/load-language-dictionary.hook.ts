import React from 'react';

import { context } from '../lng.context.ts';
import { useGetDetectedLanguage } from './get-detected-language.hook.ts';

export const useLoadLanguageDictionary = (ns: string, resource: Record<string, any>) => {
  const { presenter } = React.useContext(context);
  const detectedLanguage = useGetDetectedLanguage();

  React.useLayoutEffect(() => {
    presenter.loadLanguageDictionary(ns, resource);
  }, [detectedLanguage]);
};
