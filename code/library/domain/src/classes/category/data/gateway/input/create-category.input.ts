export interface CreateCategoryInput {
  shopUuid: string;
  parentUuid: string | null;
  name: string;
  description: string | null;
}
