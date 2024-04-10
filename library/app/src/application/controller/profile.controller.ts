import { injectable } from 'inversify';
import { makeObservable } from 'mobx';

export const ProfileControllerSymbol = Symbol.for('ProfileController');

@injectable()
export class ProfileController {
  constructor() {
    makeObservable(this);
  }
}
