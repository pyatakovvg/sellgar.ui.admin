import { MetaEntity, PropertyGroupEntity } from '@library/domain';

export abstract class PropertyControllerInterface {
  abstract getData(): PropertyGroupEntity[];
  abstract getMeta(): MetaEntity;

  abstract findAll(): Promise<PropertyGroupEntity[] | undefined>;
}
