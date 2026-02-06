import { ProfileEntity } from '@library/domain';

export abstract class AdminControllerInterface {
  abstract getProfile(): Promise<ProfileEntity>;
}
