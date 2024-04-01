import { plainToInstance } from 'class-transformer';

import { Fetch } from '../common/Fetch';
import { ProfileDto } from './dto/profile.dto';
import { ApplicationRepository } from './application.repository';

export class ApplicationService {
  private readonly _repository = new ApplicationRepository();
  private readonly _fetch = new Fetch({
    baseURL: import.meta.env.VITE_GATEWAY_API,
  });

  getStarted(): boolean {
    return this._repository.isStarted;
  }

  setStarted(state: boolean) {
    this._repository.setStarted(state);
  }

  getProfile() {
    return this._repository.profile;
  }

  async signInByCredential(email: string, password: string) {
    await this._fetch.send({
      url: '/auth/login',
      method: 'post',
      data: {
        email,
        password,
      },
    });
  }

  async getProfileByCookie() {
    try {
      const result = await this._fetch.send({
        url: '/auth/profile',
      });
      await this._repository.setProfile(plainToInstance(ProfileDto, result));
    } catch (e) {
      throw e;
    }
  }
}
