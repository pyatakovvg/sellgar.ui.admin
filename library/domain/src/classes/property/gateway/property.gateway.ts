import { inject, injectable } from 'inversify';

import { CreatePropertyDto } from './dto/create-property.dto.ts';
import { UpdatePropertyDto } from './dto/update-property.dto.ts';

import { ConfigInterface } from '../../../helpers/config';
import { HttpClientInterface } from '../../../helpers/http-client';

import { type PropertyGatewayInterface } from './property-gateway.interface.ts';

@injectable()
export class PropertyGateway implements PropertyGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  update(uuid: string, updatePropertyDto: UpdatePropertyDto) {
    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/properties/' + uuid, updatePropertyDto);
  }

  create(createPropertyDto: CreatePropertyDto) {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/properties', createPropertyDto);
  }

  findByUuid(uuid: string) {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/properties/' + uuid);
  }

  findAll() {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/properties');
  }
}
