export interface CreatePersonInput {}

export interface CreateUserInput {
  email: string;
  isBlocked: boolean;
  roles: string[];
  person?: CreatePersonInput;
}
