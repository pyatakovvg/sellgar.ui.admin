import React from 'react';

import {context} from '../lng.context.ts';

export const useChangeLanguage = () => {
  const {presenter} = React.useContext(context);

  return (lng: string) => {
    presenter.changeLanguage(lng);
  }
}