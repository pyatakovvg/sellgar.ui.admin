import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

import { ShopServiceInterface } from './shop-service.interface.ts';
import { ShopGatewayInterface } from '../gateway/shop-gateway.interface.ts';

@injectable()
export class ShopService implements ShopServiceInterface {
  constructor(@inject(ShopGatewayInterface) private readonly productGateway: ShopGatewayInterface) {}

  async findAll() {
    return await this.productGateway.findAll();
  }

  async findByUuid(uuid: string) {
    return await this.productGateway.findByUuid(uuid);
  }

  async update(uuid: string, dto: UpdateDto) {
    const dtoInstance = plainToInstance(UpdateDto, dto);

    await validateOrReject(dtoInstance);

    return this.productGateway.update(uuid, dtoInstance);
  }

  async create(dto: CreateDto) {
    const dtoInstance = plainToInstance(CreateDto, dto);

    await validateOrReject(dtoInstance);

    return await this.productGateway.create(dtoInstance);
  }
}
