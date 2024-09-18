import React from 'react';

import { context } from '../router.context.ts';

export const useRouter = () => {
  const { router } = React.useContext(context);

  return router;
};
