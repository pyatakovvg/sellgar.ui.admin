import { ProfileEntity } from '@library/domain';

export abstract class ProfileStoreInterface {
  abstract data: ProfileEntity;

  abstract reset(): void;
  abstract setData(data: ProfileEntity): void;
}
