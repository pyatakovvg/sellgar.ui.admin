import { ContainerModule } from 'inversify';

import { FormStore } from './store/form.store.ts';
import { FormStoreInterface } from './store/form-store.interface.ts';

import { SignInPresenter } from './presenter/sign-in.presenter.ts';
import { SignInPresenterInterface } from './presenter/sign-in-presenter.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<FormStoreInterface>(FormStoreInterface).to(FormStore);

  container.bind<SignInPresenterInterface>(SignInPresenterInterface).to(SignInPresenter);
});
