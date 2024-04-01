import { observable, action, makeObservable } from 'mobx';

import { ProfileDto } from './dto/profile.dto';

class Profile {
  @observable data: ProfileDto | null = null;

  @action
  setProfile(data: ProfileDto | null) {
    this.data = data;
  }

  constructor() {
    makeObservable(this);
  }
}

export class ApplicationRepository {
  @observable isStarted: boolean = false;
  @observable profile = new Profile();

  @action.bound
  setStarted(value: boolean) {
    this.isStarted = value;
  }

  @action.bound
  async setProfile(data: any) {
    // const isValid = await validate(data);
    // console.log(isValid);
    this.profile.setProfile(data);
  }

  constructor() {
    makeObservable(this);
  }
}
