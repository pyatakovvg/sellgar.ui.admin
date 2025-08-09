import { ContainerModule } from 'inversify';

import { FormStore, FormStoreSymbol } from './store/form.store.ts';
import { PropertyStore, PropertyStoreSymbol } from './store/property.store.ts';

import { PropertyPresenter, PropertyPresenterSymbol } from './presenter/property.presenter.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<FormStore>(FormStoreSymbol).to(FormStore);
  container.bind<PropertyStore>(PropertyStoreSymbol).to(PropertyStore);

  container.bind<PropertyPresenter>(PropertyPresenterSymbol).to(PropertyPresenter);
});
