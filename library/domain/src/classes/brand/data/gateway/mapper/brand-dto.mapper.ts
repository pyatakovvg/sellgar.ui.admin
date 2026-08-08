import { plainToInstance } from 'class-transformer';

import { BrandImageDto } from '../dto/brand-image.dto.ts';
import { CreateBrandDto } from '../dto/create-brand.dto.ts';
import { UpdateBrandDto } from '../dto/update-brand.dto.ts';
import { BrandImageInput } from '../input/brand-image.input.ts';
import { CreateBrandInput } from '../input/create-brand.input.ts';
import { UpdateBrandInput } from '../input/update-brand.input.ts';

export class BrandDtoMapper {
  static create(input: CreateBrandInput): CreateBrandDto {
    const { image, ...values } = input;
    const dto = plainToInstance(CreateBrandDto, values);

    return Object.assign(new CreateBrandDto(), dto, { image: this.image(image) });
  }

  static update(input: UpdateBrandInput): UpdateBrandDto {
    const { image, ...values } = input;
    const dto = plainToInstance(UpdateBrandDto, values);

    return Object.assign(new UpdateBrandDto(), dto, { image: this.image(image) });
  }

  private static image(image: BrandImageInput | null | undefined): BrandImageDto | null | undefined {
    if (!image) {
      return image;
    }

    const { file, ...values } = image;
    const dto = plainToInstance(BrandImageDto, values);

    return Object.assign(new BrandImageDto(), dto, { file });
  }
}
