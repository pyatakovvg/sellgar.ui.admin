import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

export abstract class LazyLoaderInterface {
  abstract create(args: LoaderFunctionArgs): void;
  abstract loader(args: LoaderFunctionArgs): Promise<any>;
  abstract remove(): void;
  abstract render(): React.ReactNode;
}
