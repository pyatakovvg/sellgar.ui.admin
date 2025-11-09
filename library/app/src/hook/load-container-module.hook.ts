import React from 'react';
import { Container, ContainerModule } from 'inversify';

import { useApp } from './app.hook.ts';

const mapper = new Set<ContainerModule>();

export const useLoadContainerModule = (containerModule: ContainerModule): Container => {
  const app = useApp();

  if (mapper.has(containerModule)) {
    return app.container;
  }

  React.useState(() => {
    app.container.loadSync(containerModule);
    mapper.add(containerModule);
  });

  React.useEffect(() => {
    return () => {
      mapper.delete(containerModule);
      app.container.unloadSync(containerModule);
    };
  }, []);

  return app.container;
};
