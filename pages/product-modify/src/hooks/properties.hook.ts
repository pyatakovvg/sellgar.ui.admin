import { useLoaderData } from '@tiyn/app';

import { ProductFormOptionsControllerInterface } from '../classes/controller/product-form-options-controller.interface.ts';

export const useProperties = () => {
  const options = useLoaderData(ProductFormOptionsControllerInterface);

  return options.properties;
};
