import React from 'react';
import { Container, ContainerModule } from 'inversify';

import { contextProvider } from '../../context';

import { ApplicationContext } from '../application.context.tsx';

export const useLoadContainerModule = (containerModule: ContainerModule): Container => {
  const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
  const container = applicationContext.container;

  const loadedRef = React.useRef(false);
  if (!loadedRef.current) {
    container.getContainer().loadSync(containerModule);
    loadedRef.current = true;
  }

  React.useEffect(() => {
    return () => {
      if (loadedRef.current) {
        container.getContainer().unloadSync(containerModule);
        loadedRef.current = false;
      }
    };
  }, [container, containerModule]);

  return container.getContainer();
};
