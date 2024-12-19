import { inject, injectable } from 'inversify';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';

import { CreatePropertyGroupDto } from './dto/create-property-group.dto.ts';
import { UpdatePropertyGroupDto } from './dto/update-property-group.dto.ts';

import { PropertyGroupGatewayInterface } from './property-group-gateway.interface.ts';

@injectable()
export class PropertyGroupGateway implements PropertyGroupGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  update(uuid: string, updatePropertyGroupDto: UpdatePropertyGroupDto) {
    return this.httpClient.patch(
      this.config.get('GATEWAY_API') + '/v2/properties/groups/' + uuid,
      updatePropertyGroupDto,
    );
  }

  create(createPropertyGroupDto: CreatePropertyGroupDto) {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/properties/groups', createPropertyGroupDto);
  }

  findByUuid(uuid: string) {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/properties/groups/' + uuid);
  }

  findAll() {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/properties/groups');
  }
}
