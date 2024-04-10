import { useApp } from './useApp';

export const useProfile = () => {
  const app = useApp();

  return app.controller.initialized;
};
