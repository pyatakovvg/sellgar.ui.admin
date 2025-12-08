import { ApplicationContext } from '../application.context.tsx';
import { contextProvider } from '../../context';

export const useContainer = () => {
  const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);

  return applicationContext.container.getContainer();
};
