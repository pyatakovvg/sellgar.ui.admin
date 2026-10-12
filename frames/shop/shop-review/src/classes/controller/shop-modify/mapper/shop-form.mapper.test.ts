import { ShopLegalForm } from '@library/domain';
import { describe, expect, it } from 'vitest';

import { ShopFormMapper } from './shop-form.mapper.ts';

describe('ShopFormMapper', () => {
  it('не отправляет реквизиты юридического лица для предпринимателя', () => {
    const form = {
      ...ShopFormMapper.fromEntity(),
      legalForm: ShopLegalForm.INDIVIDUAL_ENTREPRENEUR,
      legalName: 'Старое значение',
      entrepreneurFullName: 'Иванов Иван Иванович',
      inn: '123456789012',
      kpp: '123456789',
      ogrn: '1234567890123',
      ogrnip: '123456789012345',
      legalAddress: 'Москва',
      phone: '+79990000000',
    };

    const result = ShopFormMapper.toCreateInput(form);

    expect(result.legalDetails).toEqual(
      expect.objectContaining({
        legalName: null,
        entrepreneurFullName: 'Иванов Иван Иванович',
        kpp: null,
        ogrn: null,
        ogrnip: '123456789012345',
      }),
    );
  });

  it('нормализует порядок коллекций в sortOrder', () => {
    const form = {
      ...ShopFormMapper.fromEntity(),
      name: 'Магазин',
      contacts: [
        { type: 'email' as const, purpose: 'support' as const, value: 'one@example.ru', isPublic: true },
        { type: 'phone' as const, purpose: 'claims' as const, value: '+79990000000', isPublic: true },
      ],
    };

    const result = ShopFormMapper.toCreateInput(form);

    expect(result.contacts?.map(({ sortOrder }) => sortOrder)).toEqual([0, 1]);
  });
});
