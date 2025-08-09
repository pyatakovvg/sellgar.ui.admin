import { ContainerModule } from 'inversify';

import { FormStore, FormStoreSymbol } from './store/form.store.ts';
import { PropertyGroupStore, PropertyGroupStoreSymbol } from './store/property-group.store.ts';

import { PropertyGroupPresenter, PropertyGroupPresenterSymbol } from './presenter/property-group.presenter.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<FormStore>(FormStoreSymbol).to(FormStore);
  container.bind<PropertyGroupStore>(PropertyGroupStoreSymbol).to(PropertyGroupStore);

  container.bind<PropertyGroupPresenter>(PropertyGroupPresenterSymbol).to(PropertyGroupPresenter);
});
