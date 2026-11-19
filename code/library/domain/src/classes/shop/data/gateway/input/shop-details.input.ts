import type { ShopAddressType } from '../../../domain/shop-address-type.enum.ts';
import type { ShopContactPurpose } from '../../../domain/shop-contact-purpose.enum.ts';
import type { ShopContactType } from '../../../domain/shop-contact-type.enum.ts';
import type { ShopLegalForm } from '../../../domain/shop-legal-form.enum.ts';

export interface ShopLegalDetailsInput {
  legalForm: ShopLegalForm;
  legalName?: string | null;
  entrepreneurFullName?: string | null;
  registrationAuthority?: string | null;
  inn: string;
  kpp?: string | null;
  ogrn?: string | null;
  ogrnip?: string | null;
  legalAddress: string;
  actualLocation?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface ShopContactInput {
  type: ShopContactType;
  purpose: ShopContactPurpose;
  value: string;
  isPublic: boolean;
  sortOrder: number;
}

export interface ShopAddressInput {
  type: ShopAddressType;
  address: string;
  comment?: string | null;
}
