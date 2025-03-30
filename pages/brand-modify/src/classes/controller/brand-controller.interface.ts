import { BrandEntity } from '@library/domain';

export abstract class BrandControllerInterface {
  abstract getData(): BrandEntity | null;
  abstract getFormInProcess(): boolean;

  abstract findByUuid(uuid?: string): Promise<BrandEntity | undefined>;

  abstract create(brand: BrandEntity): Promise<BrandEntity>;
  abstract update(uuid: string, brand: BrandEntity): Promise<BrandEntity>;
}
