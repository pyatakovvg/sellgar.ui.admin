import type { PropertyResultEntity } from '@library/domain';
import type { ControllerInterface } from '@sellgar/app';

export abstract class PropertyControllerInterface implements ControllerInterface {
  abstract loader(): Promise<PropertyResultEntity>;
}
