import { type CurrencyResultEntity, type CurrencyServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { CurrencyListController } from '../currency-list.controller.ts';

describe('CurrencyListController', () => {
  it('возвращает валюты из результата предметного сервиса', async () => {
    const result = { data: [], meta: {} } as CurrencyResultEntity;
    const currencyService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as CurrencyServiceInterface;
    const controller = new CurrencyListController(currencyService);

    await expect(controller.loader()).resolves.toBe(result.data);
    expect(currencyService.findAll).toHaveBeenCalledOnce();
  });
});
