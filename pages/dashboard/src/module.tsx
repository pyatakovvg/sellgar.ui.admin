import { ApplicationModule } from '@library/app';
import { Page } from '@library/design';

import React from 'react';
import { Await, useAsyncValue } from 'react-router-dom';

const loadData = async () => {
  return new Promise((resolve) => setTimeout(() => resolve([{ name: 123 }]), 2000));
};

const Data = () => {
  const value = useAsyncValue();

  console.log(1, value);

  return (
    <div>
      {value.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
};

export class Module implements ApplicationModule {
  render() {
    return (
      <Page>
        <Page.Header>
          <Page.Header.Title>Дашборд</Page.Header.Title>
        </Page.Header>
        <Page.Content>
          <React.Suspense fallback={<p>oda</p>}>
            <Await resolve={loadData()}>
              <Data />
            </Await>
          </React.Suspense>
        </Page.Content>
      </Page>
    );
  }
}
