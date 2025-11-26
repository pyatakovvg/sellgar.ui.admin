import * as ReactRouter from 'react-router-dom';

export const useLocation = () => {
  const navigate = ReactRouter.useNavigate();

  return (to: string | number, options?: Omit<ReactRouter.NavigateOptions, 'replace' | 'viewTransition'>) => {
    if (to === -1) {
      return navigate(-1);
    }

    return navigate(to.toString(), {
      ...options,
      replace: false,
      viewTransition: true,
    });
  };
};
