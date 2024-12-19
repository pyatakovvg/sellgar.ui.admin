import { useParams } from 'react-router-dom';

interface IParams {
  readonly uuid?: string;
}

export const useGetParams = () => {
  return useParams() as unknown as IParams;
};
