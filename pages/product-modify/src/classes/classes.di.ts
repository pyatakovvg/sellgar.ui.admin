import { ContainerModule } from 'inversify';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { ProductStore } from './store/product/product.store.ts';
import { ProductStoreInterface } from './store/product/product-store.interface.ts';

import { ProductPresenter } from './presenter/product.presenter.ts';
import { ProductPresenterInterface } from './presenter/product-presenter.interface.ts';

const create = () => {
  return new ContainerModule((container) => {
    container.bind<FormStoreInterface>(FormStoreInterface).to(FormStore);
    container.bind<ProductStoreInterface>(ProductStoreInterface).to(ProductStore);

    container.bind<ProductPresenterInterface>(ProductPresenterInterface).to(ProductPresenter);
  });
};

export { create };
