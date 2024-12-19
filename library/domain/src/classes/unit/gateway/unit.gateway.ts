import { inject, injectable } from 'inversify';

import { CreateUnitDto } from './dto/create-unit.dto.ts';
import { UpdateUnitDto } from './dto/update-unit.dto.ts';

import { ConfigInterface } from '../../../helpers/Config';
import { HttpClientInterface } from '../../../helpers/HttpClient';

import { UnitGatewayInterface } from './unit-gateway.interface.ts';

@injectable()
export class UnitGateway implements UnitGatewayInterface {
  constructor(
    @inject(ConfigInterface) private readonly config: ConfigInterface,
    @inject(HttpClientInterface) private readonly httpClient: HttpClientInterface,
  ) {}

  update(uuid: string, updateUnitDto: UpdateUnitDto) {
    return this.httpClient.patch(this.config.get('GATEWAY_API') + '/v2/units/' + uuid, updateUnitDto);
  }

  create(createUnitDto: CreateUnitDto) {
    return this.httpClient.post(this.config.get('GATEWAY_API') + '/v2/units', createUnitDto);
  }

  findByUuid(uuid: string) {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/units/' + uuid);
  }

  findAll() {
    return this.httpClient.get(this.config.get('GATEWAY_API') + '/v2/units');
  }
}
