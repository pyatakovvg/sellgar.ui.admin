import { ShopLegalForm } from '@library/domain';
import { describe, expect, it } from 'vitest';

import { ShopFormMapper } from '../../../classes/controller/shop-modify/mapper/shop-form.mapper.ts';
import { schema } from './form.schema.ts';

const organization = {
  ...ShopFormMapper.fromEntity(),
  name: 'Магазин',
  legalName: 'ООО Пример',
  inn: '7700000001',
  kpp: '770001001',
  ogrn: '1027700000001',
  legalAddress: 'Москва',
  email: 'shop@example.ru',
};

const entrepreneur = {
  ...organization,
  legalForm: ShopLegalForm.INDIVIDUAL_ENTREPRENEUR,
  entrepreneurFullName: 'Иванов Иван Иванович',
  registrationAuthority: 'Межрайонная ИФНС России № 46 по г. Москве',
  inn: '770000000001',
  ogrnip: '304770000000001',
  legalName: '',
  kpp: '',
  ogrn: '',
};

describe('Состав юридических сведений магазина', () => {
  it.each([organization, entrepreneur])('принимает реквизиты $legalForm', async (form) => {
    expect(await schema.isValid(form)).toBe(true);
  });

  it('требует КПП только от организации', async () => {
    expect(await schema.isValid({ ...organization, kpp: '' })).toBe(false);
    expect(await schema.isValid(entrepreneur)).toBe(true);
  });

  it('требует регистрирующий орган ИП', async () => {
    expect(await schema.isValid({ ...entrepreneur, registrationAuthority: '' })).toBe(false);
  });

  it.each([
    { ...organization, inn: entrepreneur.inn },
    { ...entrepreneur, inn: organization.inn },
    { ...organization, inn: '12345678901' },
  ])('не принимает ИНН $inn для $legalForm', async (form) => {
    expect(await schema.isValid(form)).toBe(false);
  });

  it('очищает реквизиты прежнего типа в отправляемом запросе при переключении в обе стороны', () => {
    const mixed = {
      ...entrepreneur,
      legalName: organization.legalName,
      kpp: organization.kpp,
      ogrn: organization.ogrn,
    };
    expect(ShopFormMapper.toCreateInput(mixed).legalDetails).toMatchObject({ legalName: null, kpp: null, ogrn: null });
    expect(
      ShopFormMapper.toCreateInput({ ...mixed, legalForm: ShopLegalForm.LEGAL_ENTITY }).legalDetails,
    ).toMatchObject({
      entrepreneurFullName: null,
      ogrnip: null,
      registrationAuthority: null,
    });
  });
});
