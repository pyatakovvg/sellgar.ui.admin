export interface UpdateCategoryInput {
  commandId: string;
  uuid: string;
  expectedVersion: number;
  parentUuid: string | null;
  name: string;
  description: string | null;
}
