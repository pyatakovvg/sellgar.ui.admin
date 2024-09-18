import React from 'react';
import { observer } from 'mobx-react';

import { context } from '../../shops.context';

import { List } from './List';

export const Content = observer(() => {
  const { presenter } = React.useContext(context);

  if (presenter.isLoading) {
    return <p>Loading</p>;
  }

  if (presenter.shopsStore.getError()) {
    return <p>Error {presenter.shopsStore.getError()?.message}</p>;
  }

  return <List />;
});
