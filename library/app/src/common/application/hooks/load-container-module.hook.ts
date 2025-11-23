import React from 'react';
import { Container, ContainerModule } from 'inversify';

import { ApplicationContext } from '../application.context.tsx';
import { contextProvider } from '../../context';

export const useLoadContainerModule = (containerModule: ContainerModule): Container => {
  const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);

  React.useState(() => {
    applicationContext.container.bind(containerModule);
  });

  React.useEffect(() => {
    return () => {
      applicationContext.container.unbind(containerModule);
    };
  }, []);

  return applicationContext.container.getContainer();
};
