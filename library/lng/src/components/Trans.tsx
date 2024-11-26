import React from 'react';
import { Trans as I18NextTrans } from 'react-i18next';

interface IProps {
  t: any;
}

export const Trans: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return <I18NextTrans {...props} />;
};
