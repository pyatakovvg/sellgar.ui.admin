import { ProfileEntity } from '../../domain/profile.entity.ts';

export abstract class ProfileGatewayInterface {
  abstract get(): Promise<ProfileEntity>;
}
