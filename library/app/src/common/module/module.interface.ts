import React from 'react';
import { Container } from 'inversify';

import { ControllerInterface } from './controller';

export interface ModuleArgs {
  params: Record<string, any>;
  context: {
    container: Container;
    controller: ControllerInterface;
  };
}

export interface ModuleInterface {
  initialize?(args: ModuleArgs): Promise<void> | void;
  destructor?(args: ModuleArgs): Promise<void> | void;
  loader?(args: ModuleArgs): any;
  render(args: ModuleArgs): React.ReactNode;
}
