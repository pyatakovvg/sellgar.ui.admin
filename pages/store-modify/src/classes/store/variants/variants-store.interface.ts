import { ProductVariantEntity } from '@library/domain';

export abstract class VariantsStoreInterface {
  abstract inProcess: boolean;
  abstract variants: ProductVariantEntity[];

  abstract setProcess(state: boolean): void;
  abstract setVariants(variants: ProductVariantEntity[]): void;
}
