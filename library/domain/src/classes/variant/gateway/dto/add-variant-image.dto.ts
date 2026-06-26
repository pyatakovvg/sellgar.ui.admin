export class AddVariantImageDto {
  imageUuid: string;
  fileName?: string;
  sortOrder?: number;
  isPrimary?: boolean;
  alt?: string | null;
}
