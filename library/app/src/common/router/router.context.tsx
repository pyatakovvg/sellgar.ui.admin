import React from 'react';

import type { IOptions } from './router.interface.ts';

export class RouterContext {
  constructor(
    public options: IOptions,
    public exception: React.ReactNode,
  ) {}
}
