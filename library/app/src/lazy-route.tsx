import React from 'react';
import { Container } from 'inversify';
import { Params } from 'react-router-dom';

import { ApplicationControllerInterface } from './classes/controller/application-controller.interface.ts';

export interface IClassModuleArgs {
  container: Container;
  controller: ApplicationControllerInterface;
  params?: Params;
}

export interface IClassModule {
  destructor?(args: IClassModuleArgs): void;
  loader?(args: IClassModuleArgs): unknown;
  render(args: IClassModuleArgs): React.JSX.Element;
}

export class LazyRoute {
  private instance?: IClassModule;

  constructor(private readonly ClassModule: new (args: IClassModuleArgs) => IClassModule) {}

  create(args: IClassModuleArgs) {
    this.destructor(args);
    this.instance = new this.ClassModule(args);
  }

  destructor(args: IClassModuleArgs) {
    if (this.instance) {
      if (this.instance.destructor) {
        this.instance.destructor(args);
        delete this.instance;
      }
    }
  }

  loader(args: IClassModuleArgs) {
    if (this.instance?.loader) {
      return this.instance.loader(args);
    }
  }

  render(args: IClassModuleArgs) {
    return <>{this.instance?.render(args)}</>;
  }
}
