import * as ReactRouter from 'react-router-dom';

export const useLocation = () => {
  const navigate = ReactRouter.useNavigate();

  return (to: string, options?: Omit<ReactRouter.NavigateOptions, 'replace' | 'viewTransition'>) => {
    return navigate(to, {
      ...options,
      replace: false,
      viewTransition: true,
    });
  };
};
