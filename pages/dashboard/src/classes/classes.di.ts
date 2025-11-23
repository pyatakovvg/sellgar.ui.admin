import * as inversify from 'inversify';

import { DashboardConstructor } from './constructor/dashboard.constructor.ts';
import { DashboardConstructorInterface } from './constructor/dashboard-constructor.interface.ts';

export const containerModule = new inversify.ContainerModule((container) => {
  container.bind(DashboardConstructorInterface).to(DashboardConstructor);
});
