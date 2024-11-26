import { useNavigate as useRouterNavigate, NavigateOptions } from 'react-router-dom';

export const useNavigate = () => {
  const navigate = useRouterNavigate();

  return (to: string, options?: NavigateOptions) => {
    return navigate(import.meta.env.BASE_URL.replace(/\/$/gi, '') + to, options);
  };
};
