import { MetaEntity, PropertyEntity } from '@library/domain';

export abstract class PropertyControllerInterface {
  abstract getData(): PropertyEntity[];
  abstract getMeta(): MetaEntity;

  abstract loader(): Promise<PropertyEntity[] | undefined>;
}
