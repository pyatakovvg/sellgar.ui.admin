import React from 'react';
import { observer } from 'mobx-react';

import { Modify } from './Modify';

export const Content = observer(() => {
  return <Modify />;
});
