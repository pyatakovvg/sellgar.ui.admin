import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

export abstract class ApplicationModule {
  abstract create?(): void;
  abstract destroy?(): void;
  abstract loader?(args: LoaderFunctionArgs): any;
  abstract render(): React.ReactNode;
}
