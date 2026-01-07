import { StoreEntity } from '@library/domain';

import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

import { ProcessStoreInterface } from '../store/process/process-store.interface.ts';
import { VariantsStoreInterface } from '../store/variants/variants-store.interface.ts';

export abstract class StoreControllerInterface {
  abstract readonly processStore: ProcessStoreInterface;
  abstract readonly variantsStore: VariantsStoreInterface;

  abstract create(dto: CreateDto, cb: (result: StoreEntity) => Promise<void>): Promise<void>;
  abstract update(dto: UpdateDto, cb: (result: StoreEntity) => Promise<void>): Promise<void>;
}
