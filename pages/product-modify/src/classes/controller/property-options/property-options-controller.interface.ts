import type { PropertyResultEntity } from '@library/domain';

export abstract class PropertyOptionsControllerInterface {
  abstract loader(): Promise<PropertyResultEntity>;
}
