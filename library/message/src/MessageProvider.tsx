import React from 'react';
import { useDependency } from '@tiyn/app';

import { MessagePresenter, MessagePresenterSymbol } from './classes/presenters/message.presenter.ts';

import { Provider } from './message.context.ts';

export const MessageProvider: React.FC<React.PropsWithChildren> = (props) => {
  const presenter = useDependency<MessagePresenter>(MessagePresenterSymbol);

  return <Provider value={{ presenter }}>{props.children}</Provider>;
};
