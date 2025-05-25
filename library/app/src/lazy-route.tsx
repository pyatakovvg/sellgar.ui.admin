import React from 'react';
import { Container } from 'inversify';
import { LoaderFunctionArgs } from 'react-router-dom';

import { container } from './classes/container.di.ts';

export interface IClassModule {
  destructor?(): void;
  loader?(args: LoaderFunctionArgs): unknown;
  render(): React.JSX.Element;
}

export class LazyRoute {
  private instance: IClassModule;

  constructor(private readonly ClassModule: new (container: Container) => IClassModule) {}

  create() {
    this.instance = new this.ClassModule(container);
  }

  destructor() {
    if (this.instance) {
      if (this.instance.destructor) {
        this.instance.destructor();
      }
    }
  }

  loader(args: LoaderFunctionArgs) {
    if (this.instance.loader) {
      return this.instance.loader(args);
    }
  }

  render() {
    return <>{this.instance.render()}</>;
  }
}
