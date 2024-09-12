import { IsString, IsBoolean } from 'class-validator';

export class ShopEntity {
  @IsString()
  uuid: string;

  @IsString()
  name: string;

  @IsBoolean()
  isActive: boolean;
}
