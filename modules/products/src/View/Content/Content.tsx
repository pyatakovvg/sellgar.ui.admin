import React from 'react';
import { observer } from 'mobx-react';

import { context } from '../../products.context.ts';

import { Empty } from './Empty';
import { List } from './List';
import { Loading } from './Loading';

export const Content = observer(() => {
  const { presenter } = React.useContext(context);

  if (presenter.isLoading) {
    return <Loading />;
  }

  if (!presenter.products.length) {
    return <Empty />;
  }

  return <List />;
});
