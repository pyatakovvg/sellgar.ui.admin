import { action, observable } from 'mobx';

import { ApplicationService } from './application.service';

export class ApplicationController {
  @observable initialized = false;

  private readonly _appService = new ApplicationService();

  getStarted() {
    return this._appService.getStarted();
  }

  setStarted(state: boolean) {
    this._appService.setStarted(state);
  }

  async signIn(login: string, password: string) {
    await this._appService.signInByCredential(login, password);
    await this._appService.getProfileByCookie();
  }

  @action.bound
  async checkProfile() {
    try {
      await this._appService.getProfileByCookie();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.initialized = true;
      return true;
    } catch (e) {
      this.initialized = false;
      return false;
    }
  }

  async getProfile() {
    return this._appService.getProfile();
  }
}
