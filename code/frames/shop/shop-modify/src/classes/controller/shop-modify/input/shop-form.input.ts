import type { ShopAddressType, ShopContactPurpose, ShopContactType, ShopLegalForm } from '@library/domain';

export interface ShopContactFormInput {
  type: ShopContactType;
  purpose: ShopContactPurpose;
  value: string;
  isPublic: boolean;
}

export interface ShopAddressFormInput {
  type: ShopAddressType;
  address: string;
  comment: string;
}

export interface ShopFormInput {
  version?: number;
  name: string;
  legalForm: ShopLegalForm;
  legalName: string;
  entrepreneurFullName: string;
  registrationAuthority: string;
  inn: string;
  kpp: string;
  ogrn: string;
  ogrnip: string;
  legalAddress: string;
  actualLocation: string;
  email: string;
  phone: string;
  contacts: ShopContactFormInput[];
  addresses: ShopAddressFormInput[];
}
