import { ShopLegalForm, type CreateShopInput, type ShopEntity, type UpdateShopInput } from '@library/domain';

import type { ShopFormInput } from '../input/shop-form.input.ts';

export class ShopFormMapper {
  static fromEntity(shop?: ShopEntity): ShopFormInput {
    const details = shop?.legalDetails;

    return {
      version: shop?.version,
      name: shop?.name ?? '',
      legalForm: details?.legalForm ?? ShopLegalForm.LEGAL_ENTITY,
      legalName: details?.legalName ?? '',
      entrepreneurFullName: details?.entrepreneurFullName ?? '',
      registrationAuthority: details?.registrationAuthority ?? '',
      inn: details?.inn ?? '',
      kpp: details?.kpp ?? '',
      ogrn: details?.ogrn ?? '',
      ogrnip: details?.ogrnip ?? '',
      legalAddress: details?.legalAddress ?? '',
      actualLocation: details?.actualLocation ?? '',
      email: details?.email ?? '',
      phone: details?.phone ?? '',
      contacts: (shop?.contacts ?? []).map(({ type, purpose, value, isPublic }) => ({
        type,
        purpose,
        value,
        isPublic,
      })),
      addresses: (shop?.addresses ?? []).map(({ type, address, comment }) => ({
        type,
        address,
        comment: comment ?? '',
      })),
    };
  }

  static toCreateInput(form: ShopFormInput): CreateShopInput {
    return this.toMutableInput(form);
  }

  static toUpdateInput(form: ShopFormInput): UpdateShopInput {
    if (!form.version) throw new Error('Версия магазина не определена. Обновите страницу и повторите действие.');
    return { version: form.version, ...this.toMutableInput(form) };
  }

  private static toMutableInput(form: ShopFormInput): CreateShopInput {
    return {
      name: form.name.trim(),
      legalDetails: {
        legalForm: form.legalForm,
        legalName: form.legalForm === ShopLegalForm.LEGAL_ENTITY ? this.toNullable(form.legalName) : null,
        entrepreneurFullName:
          form.legalForm === ShopLegalForm.INDIVIDUAL_ENTREPRENEUR ? this.toNullable(form.entrepreneurFullName) : null,
        registrationAuthority:
          form.legalForm === ShopLegalForm.INDIVIDUAL_ENTREPRENEUR ? this.toNullable(form.registrationAuthority) : null,
        inn: form.inn.trim(),
        kpp: form.legalForm === ShopLegalForm.LEGAL_ENTITY ? this.toNullable(form.kpp) : null,
        ogrn: form.legalForm === ShopLegalForm.LEGAL_ENTITY ? this.toNullable(form.ogrn) : null,
        ogrnip: form.legalForm === ShopLegalForm.INDIVIDUAL_ENTREPRENEUR ? this.toNullable(form.ogrnip) : null,
        legalAddress: form.legalAddress.trim(),
        actualLocation: this.toNullable(form.actualLocation),
        email: this.toNullable(form.email),
        phone: this.toNullable(form.phone),
      },
      contacts: form.contacts.map((contact, sortOrder) => ({
        ...contact,
        value: contact.value.trim(),
        sortOrder,
      })),
      addresses: form.addresses.map((address) => ({
        ...address,
        address: address.address.trim(),
        comment: this.toNullable(address.comment),
      })),
    };
  }

  private static toNullable(value: string): string | null {
    return value.trim() || null;
  }
}
