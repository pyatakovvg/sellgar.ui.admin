import React from 'react';

import { Provider } from '@/root/buckets.context.ts';

import { Module } from '@/components/Module.tsx';

import { container } from '@/classes/classes.di.ts';
import { BucketPresenter, BucketPresenterSymbol } from '@/classes/presenter/bucket.presenter.ts';

export default function BucketsModule() {
  const presenter = container.get<BucketPresenter>(BucketPresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <Module />
    </Provider>
  );
}
