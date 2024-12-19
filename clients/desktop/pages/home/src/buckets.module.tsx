import React from 'react';

import { Provider } from './buckets.context.ts';

import { Page } from './components/Page';

import { container } from './classes/classes.di.ts';
import { BucketPresenter, BucketPresenterSymbol } from './classes/presenter/bucket.presenter.ts';

export function HomeModule() {
  return (
    <Provider value={{ presenter: container.get<BucketPresenter>(BucketPresenterSymbol) }}>
      <Page />
    </Provider>
  );
}
