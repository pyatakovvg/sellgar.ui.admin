export interface BrandImageInput {
  localId?: string;
  imageUuid?: string;
  file?: File;
  fileName?: string;
  alt?: string | null;
}

export interface CreateBrandInput {
  code: string;
  name: string;
  description: string;
  image?: BrandImageInput | null;
}
