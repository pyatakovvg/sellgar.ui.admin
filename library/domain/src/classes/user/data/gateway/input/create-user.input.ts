import type { CreatePersonInput } from './create-person.input.ts';

export interface CreateUserInput {
  email: string;
  isBlocked: boolean;
  roles: string[];
  person?: CreatePersonInput;
}
