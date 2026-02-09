import { contextProvider } from '../../context';

import { ApplicationContext } from '../application.context.tsx';
import { ApplicationControllerInterface } from '../classes/controller/application-controller.interface.ts';

export const useDataStore = () => {
  const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);

  return applicationContext.container.getContainer().get(ApplicationControllerInterface).dataStore;
};
