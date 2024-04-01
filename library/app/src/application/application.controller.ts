import { ApplicationService } from './application.service';

export class ApplicationController {
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

  async checkProfile() {
    try {
      await this._appService.getProfileByCookie();

      return true;
    } catch (e) {
      return false;
    }
  }

  async getProfile() {
    return this._appService.getProfile();
  }
}
