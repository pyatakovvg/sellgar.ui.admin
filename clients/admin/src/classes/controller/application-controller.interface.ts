import { ProfileEntity } from '@library/domain';

export abstract class ApplicationControllerInterface {
  abstract getProfile(): Promise<ProfileEntity>;
}
