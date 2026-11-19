import { ProfileEntity } from '../domain/profile.entity.ts';

export abstract class ProfileServiceInterface {
  abstract get(): Promise<ProfileEntity>;
}
