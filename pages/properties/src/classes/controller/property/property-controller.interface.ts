import type { PropertyResultEntity } from '@library/domain';

export abstract class PropertyControllerInterface {
  abstract loader(): Promise<PropertyResultEntity>;
}
