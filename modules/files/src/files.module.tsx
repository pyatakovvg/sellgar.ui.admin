import React from 'react';

import { Provider } from '@/root/files.context.ts';

import { Module } from '@/components/Module.tsx';

import { container } from '@/classes/classes.di.ts';
import { FilePresenter, FilePresenterSymbol } from '@/classes/presenter/file.presenter.ts';

export default function FilesModule() {
  const presenter = container.get<FilePresenter>(FilePresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <Module />
    </Provider>
  );
}
