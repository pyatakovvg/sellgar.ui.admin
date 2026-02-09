import { VariantEntity } from '@library/domain';

export abstract class VariantsStoreInterface {
  abstract variants: VariantEntity[];

  abstract setVariants(data: VariantEntity[]): void;
}
