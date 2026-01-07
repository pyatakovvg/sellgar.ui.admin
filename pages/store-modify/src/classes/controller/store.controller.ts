import { StoreEntity, StoreServiceInterface, VariantServiceInterface } from '@library/domain';
import { LoaderArgs } from '@library/app';

import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ProcessStoreInterface } from '../store/process/process-store.interface.ts';
import { VariantsStoreInterface } from '../store/variants/variants-store.interface.ts';

import { StoreControllerInterface } from './store-controller.interface.ts';

import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

@injectable()
export class StoreController implements StoreControllerInterface {
  constructor(
    @inject(ProcessStoreInterface) readonly processStore: ProcessStoreInterface,
    @inject(VariantsStoreInterface) readonly variantsStore: VariantsStoreInterface,

    @inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @inject(VariantServiceInterface) private readonly productVariantService: VariantServiceInterface,
  ) {}

  async create(dto: CreateDto, cb: (result: StoreEntity) => Promise<void>) {
    this.processStore.setProcess(true);

    try {
      const data = plainToInstance(UpdateDto, dto);

      await validateOrReject(data);

      const result = await this.storeService.create(data);

      await cb(result);
    } catch (error) {
      console.log(123, error);
      this.processStore.setProcess(false);
    }
  }

  async update(dto: UpdateDto, cb: (result: StoreEntity) => Promise<void>) {
    this.processStore.setProcess(true);

    try {
      const data = plainToInstance(UpdateDto, dto);

      await validateOrReject(data);

      const result = await this.storeService.update(data);

      await cb(result);
    } catch (error) {
      console.log(123, error);
    } finally {
      this.processStore.setProcess(false);
    }
  }

  async loader(args: LoaderArgs) {
    const variants = await this.productVariantService.findAll();

    this.variantsStore.setVariants(variants.data);

    if (args.params?.uuid) {
      return await this.storeService.findByUuid(args.params.uuid);
    }
  }
}
