import { injectable, inject } from 'inversify';
import { makeObservable, action, computed, observable } from 'mobx';

import { ProfileStore, ProfileStoreSymbol } from '../store/profile.store.ts';
import { ApplicationStore, ApplicationStoreSymbol } from '../store/application.store.ts';

export const ApplicationPresenterSymbol = Symbol.for('ApplicationPresenter');

@injectable()
export class ApplicationPresenter {
  @observable initialized = false;

  constructor(
    @inject(ProfileStoreSymbol) private readonly profileStore: ProfileStore,
    @inject(ApplicationStoreSymbol) private readonly applicationStore: ApplicationStore,
  ) {
    makeObservable(this);
  }

  @computed
  get profile() {
    return this.profileStore.profile;
  }

  @action.bound
  setApplicationInitialized() {
    this.initialized = true;
  }

  @action.bound
  async signIn(login: string, password: string) {
    await this.applicationStore.signIn(login, password);
    if (this.initialized) {
      await this.profileStore.getProfile();
    }
  }

  @action.bound
  async signOut() {
    await this.applicationStore.signOut();
    this.profileStore.resetProfile();
  }

  @action.bound
  async getProfile() {
    await this.profileStore.getProfile();
  }

  checkRoles(roles: string[]) {
    return this.profileStore.checkRoles(roles);
  }

  checkPermissions(permissions: string[]) {
    return this.profileStore.checkRoles(permissions);
  }
}
