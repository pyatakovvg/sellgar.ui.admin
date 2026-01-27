import React from 'react';
import { Container, ContainerModule } from 'inversify';

import { ApplicationContext } from '../application.context.tsx';
import { contextProvider } from '../../context';

export const useLoadContainerModule = (containerModule: ContainerModule): Container => {
  const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);

  React.useMemo(() => {
    applicationContext.container.bind(containerModule);
    return null;
  }, [applicationContext, containerModule]);

  React.useEffect(() => {
    applicationContext.container.bind(containerModule);
    return () => {
      applicationContext.container.unbind(containerModule);
    };
  }, [applicationContext, containerModule]);

  return applicationContext.container.getContainer();
};
