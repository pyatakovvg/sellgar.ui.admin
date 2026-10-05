import { ShopAddressType, ShopContactPurpose, ShopContactType, ShopLegalForm } from '@library/domain';

export const legalFormOptions = [
  { code: ShopLegalForm.LEGAL_ENTITY, name: 'Юридическое лицо' },
  { code: ShopLegalForm.INDIVIDUAL_ENTREPRENEUR, name: 'Индивидуальный предприниматель' },
];

export const contactTypeOptions = [
  { code: ShopContactType.EMAIL, name: 'Электронная почта' },
  { code: ShopContactType.PHONE, name: 'Телефон' },
];

export const contactPurposeOptions = [
  { code: ShopContactPurpose.SUPPORT, name: 'Поддержка' },
  { code: ShopContactPurpose.CLAIMS, name: 'Претензии' },
  { code: ShopContactPurpose.RECEIPTS, name: 'Кассовые чеки' },
];

export const addressTypeOptions = [
  { code: ShopAddressType.CLAIMS, name: 'Претензии' },
  { code: ShopAddressType.RETURNS, name: 'Возвраты' },
  { code: ShopAddressType.PICKUP, name: 'Самовывоз' },
];
