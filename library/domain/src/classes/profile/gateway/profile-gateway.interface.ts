import { ProfileEntity } from '../profile.entity.ts';

export abstract class ProfileGatewayInterface {
  abstract get(): Promise<ProfileEntity>;
}
