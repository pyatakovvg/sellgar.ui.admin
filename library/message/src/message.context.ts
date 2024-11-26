import React from 'react';

import { MessagePresenter } from './classes/presenters/message.presenter.ts';

interface IProps {
  presenter: MessagePresenter;
}

export const context = React.createContext({} as IProps);
export const Provider = context.Provider;
