import type { UpdatePersonInput } from './update-person.input.ts';

export interface UpdateUserInput {
  uuid: string;
  email: string;
  isBlocked: boolean;
  person?: UpdatePersonInput;
}
