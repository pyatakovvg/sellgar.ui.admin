import { Await } from '@library/app';

import React from 'react';

import { Modify } from './modify';
import { Fallback } from './fallback';
import { Exception } from './exception';

import { context } from '../widget.context.tsx';
import { useFindByUuidRequest } from '../requests/find-by-uuid.request.ts';

export const WidgetView: React.FC = () => {
  const { uuid } = React.useContext(context);

  const findByUuidRequest = useFindByUuidRequest();

  if (uuid) {
    return (
      <Await error={<Exception />} fallback={<Fallback />} loader={findByUuidRequest(uuid)}>
        <Modify />
      </Await>
    );
  }
  return <Modify />;
};
