import { CreateCurrencyDto } from './dto/create-currency.dto.ts';
import { UpdateCurrencyDto } from './dto/update-currency.dto.ts';

export abstract class CurrencyGatewayInterface {
  abstract findAll(): Promise<any>;
  abstract findByUuid(uuid: string): Promise<any>;
  abstract create(dto: CreateCurrencyDto): Promise<any>;
  abstract update(code: string, dto: UpdateCurrencyDto): Promise<any>;
}
