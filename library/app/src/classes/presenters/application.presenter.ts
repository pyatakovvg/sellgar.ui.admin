import { ProfileEntity } from '@library/domain';

import { injectable, inject } from 'inversify';

import { ProfileStore, ProfileStoreSymbol } from '../stores/profile.store.ts';
import { ApplicationStore, ApplicationStoreSymbol } from '../stores/application.store.ts';

export const ApplicationPresenterSymbol = Symbol.for('ApplicationPresenter');

@injectable()
export class ApplicationPresenter {
  constructor(
    @inject(ProfileStoreSymbol) private readonly profileStore: ProfileStore,
    @inject(ApplicationStoreSymbol) private readonly applicationStore: ApplicationStore,
  ) {}

  get initialized(): boolean {
    return this.applicationStore.initialized;
  }

  get profile(): ProfileEntity {
    return this.profileStore.profile;
  }

  setApplicationInitialized() {
    this.applicationStore.setInitialize(true);
  }

  async loadProfile() {
    await this.profileStore.loadProfile();
  }

  checkRoles(roles: string[]) {
    return this.profileStore.checkRoles(roles);
  }

  checkPermissions(permissions: string[]) {
    return this.profileStore.checkRoles(permissions);
  }
}
