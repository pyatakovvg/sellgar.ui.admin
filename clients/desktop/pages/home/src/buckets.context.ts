'use client';

import React from 'react';

import { BucketPresenter } from './classes/presenter/bucket.presenter.ts';

interface IContext {
  presenter: BucketPresenter;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
