import { CreateCurrencyDto } from './create-currency.dto.ts';
import type { UpdateCurrencyInput } from '../input/update-currency.input.ts';

export class UpdateCurrencyDto extends CreateCurrencyDto implements UpdateCurrencyInput {}
