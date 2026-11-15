export interface CreateCategoryInput {
  commandId: string;
  shopUuid: string;
  parentUuid: string | null;
  name: string;
  description: string | null;
}
