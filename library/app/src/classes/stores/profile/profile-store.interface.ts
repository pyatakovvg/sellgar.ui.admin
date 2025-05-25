import { ProfileEntity } from '@library/domain';

export abstract class ProfileStoreInterface {
  abstract profile: ProfileEntity;

  abstract setProfile(profile: ProfileEntity): void;

  abstract checkRoles(targetRoles: string[]): boolean;
  abstract checkPermissions(targetPermissions: string[]): boolean;
}
