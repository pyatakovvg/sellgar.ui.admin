import { useRevalidator, useNavigation } from 'react-router-dom';

export const useLoaderRevalidate = () => {
  const { revalidate, state } = useRevalidator();
  const navigation = useNavigation();
  const inProcess = Boolean(navigation.location);

  console.log(123, 1, state);

  return { revalidate, inProcess };
};
