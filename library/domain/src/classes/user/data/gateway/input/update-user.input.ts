export interface UpdatePersonInput {
  uuid: string;
}

export interface UpdateUserInput {
  uuid: string;
  email: string;
  isBlocked: boolean;
  person?: UpdatePersonInput;
}
