import React from 'react';

import { PublicRoutesInterface } from '../public-routes';
import { PrivateRoutesInterface } from '../private-routes';

export interface IOptions {
  baseUrl?: string;
  layout?(outlet: React.ReactNode): React.ReactNode;
  routes: (PrivateRoutesInterface | PublicRoutesInterface)[];
}

export abstract class RouterInterface {
  abstract render(): React.FC;
}
