import { ProfileEntity } from '../profile.entity.ts';

export abstract class ProfileServiceInterface {
  abstract get(): Promise<ProfileEntity>;
}
