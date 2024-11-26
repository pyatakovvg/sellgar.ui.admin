import React from 'react';
import { useTranslation as useI18NextTranslation } from 'react-i18next';

import { context } from '../lng.context.ts';

export const useTranslation = (ns: string, resource: any) => {
  const { presenter } = React.useContext(context);

  if (!presenter.getI18NextInstance().hasResourceBundle(presenter.detectedLanguage(), ns)) {
    presenter.loadLanguageDictionary(ns, resource);
  }

  return useI18NextTranslation(ns);
};
