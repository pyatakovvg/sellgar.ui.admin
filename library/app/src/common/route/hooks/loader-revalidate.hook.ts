import { useRevalidator, useNavigation } from 'react-router-dom';

export const useLoaderRevalidate = () => {
  const { revalidate, state } = useRevalidator();
  const navigation = useNavigation();
  const inProcess = Boolean(navigation.location);
  const inLoading = state !== 'idle';

  return { revalidate, inProcess: inProcess || inLoading };
};
