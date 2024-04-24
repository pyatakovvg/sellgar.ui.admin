import React from 'react';
import { observer } from 'mobx-react';

import { context } from '../../users.context.ts';

import { List } from './List';
import { Empty } from './Empty';
import { Loading } from './Loading';

export const Content = observer(() => {
  const { presenter } = React.useContext(context);

  if (presenter.isLoading) {
    return <Loading />;
  }

  if (!presenter.users.length) {
    return <Empty />;
  }

  return <List />;
});
