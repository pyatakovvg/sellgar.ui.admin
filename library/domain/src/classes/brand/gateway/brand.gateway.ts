import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';

import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';

import { type BrandGatewayInterface } from './brand-gateway.interface.ts';

@injectable()
export class BrandGateway implements BrandGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  update(uuid: string, updateBrandDto: UpdateBrandDto) {
    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/brands/' + uuid, updateBrandDto);
  }

  create(createBrandDto: CreateBrandDto) {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/brands', createBrandDto);
  }

  findByUuid(uuid: string) {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/brands/' + uuid);
  }

  findAll() {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/brands');
  }
}
