export interface CategoryImageInput {
  localId?: string;
  imageUuid?: string;
  file?: File;
  fileName?: string;
  alt?: string | null;
}

export interface CreateCategoryInput {
  parentUuid?: string | null;
  code: string;
  name: string;
  description: string;
  image?: CategoryImageInput | null;
}
