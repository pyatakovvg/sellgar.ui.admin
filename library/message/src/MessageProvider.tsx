import React from 'react';

import { container } from './classes/classes.di.ts';
import { MessagePresenter, MessagePresenterSymbol } from './classes/presenters/message.presenter.ts';

import { Provider } from './message.context.ts';

export const MessageProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider value={{ presenter: container.get<MessagePresenter>(MessagePresenterSymbol) }}>{props.children}</Provider>
  );
};
