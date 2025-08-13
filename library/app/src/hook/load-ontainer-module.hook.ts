import React from 'react';
import { Container, ContainerModule } from 'inversify';

import { useApp } from './app.hook.ts';

export const useLoadContainerModule = (cb: () => ContainerModule): Container | null => {
  const app = useApp();
  const [isLoaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const containerModule = cb();
    app.container.loadSync(containerModule);
    setLoaded(true);
    return () => {
      app.container.unloadSync(containerModule);
    };
  }, []);

  return isLoaded ? app.container : null;
};
