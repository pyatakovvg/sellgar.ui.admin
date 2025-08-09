import { ContainerModule } from 'inversify';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { PriceStore } from './store/price/price.store.ts';
import { PriceStoreInterface } from './store/price/price-store.interface.ts';

import { VariantsStore } from './store/variants/variants.store.ts';
import { VariantsStoreInterface } from './store/variants/variants-store.interface.ts';

import { ProductPresenter } from './presenter/product.presenter.ts';
import { ProductPresenterInterface } from './presenter/product-presenter.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<FormStoreInterface>(FormStoreInterface).to(FormStore);
  container.bind<PriceStoreInterface>(PriceStoreInterface).to(PriceStore);
  container.bind<VariantsStoreInterface>(VariantsStoreInterface).to(VariantsStore);

  container.bind<ProductPresenterInterface>(ProductPresenterInterface).to(ProductPresenter);
});
