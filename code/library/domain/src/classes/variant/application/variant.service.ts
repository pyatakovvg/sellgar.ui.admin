import { Inject, Injectable } from '@sellgar/app';

import { VariantServiceInterface } from './variant-service.interface.ts';
import { VariantGatewayInterface } from '../data/gateway/variant-gateway.interface.ts';
import { AddVariantImageInput } from '../data/gateway/input/add-variant-image.input.ts';
import { CreateVariantInput } from '../data/gateway/input/create-variant.input.ts';
import { UpdateVariantInput } from '../data/gateway/input/update-variant.input.ts';
import { ProductVariantResultEntity } from '../domain/product-variant-result.entity.ts';
import { VariantEntity } from '../domain/variant.entity.ts';

@Injectable()
export class VariantService implements VariantServiceInterface {
  constructor(@Inject(VariantGatewayInterface) private readonly variantGateway: VariantGatewayInterface) {}

  findAll(): Promise<ProductVariantResultEntity> {
    return this.variantGateway.findAll();
  }

  findByUuid(uuid: string): Promise<VariantEntity | null> {
    return this.variantGateway.findByUuid(uuid);
  }

  update(uuid: string, input: UpdateVariantInput): Promise<VariantEntity> {
    return this.variantGateway.update(uuid, input);
  }

  create(input: CreateVariantInput): Promise<VariantEntity> {
    return this.variantGateway.create(input);
  }

  addImage(variantUuid: string, input: AddVariantImageInput): Promise<VariantEntity> {
    return this.variantGateway.addImage(variantUuid, input);
  }

  removeImage(variantUuid: string, imageUuid: string): Promise<VariantEntity> {
    return this.variantGateway.removeImage(variantUuid, imageUuid);
  }
}
