export interface UpdateCategoryInput {
  uuid: string;
  expectedVersion: number;
  parentUuid: string | null;
  name: string;
  description: string | null;
}
