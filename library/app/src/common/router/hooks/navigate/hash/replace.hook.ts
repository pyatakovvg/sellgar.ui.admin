import * as ReactRouter from 'react-router-dom';

export const useHash = () => {
  const navigate = ReactRouter.useNavigate();

  return (to: string, options?: Omit<ReactRouter.NavigateOptions, 'replace' | 'viewTransition'>) => {
    if (!/^#/.test(to)) {
      throw new Error('Неверный формат hash');
    }

    return navigate(to, {
      ...options,
      replace: true,
      viewTransition: true,
    });
  };
};
