import { type CategoryResultEntity, type CategoryServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { CategoryListController } from '../category-list.controller.ts';

describe('CategoryListController', () => {
  it('возвращает категории из результата предметного сервиса', async () => {
    const result = { data: [], meta: {} } as CategoryResultEntity;
    const categoryService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as CategoryServiceInterface;
    const controller = new CategoryListController(categoryService);

    await expect(controller.loader()).resolves.toBe(result.data);
    expect(categoryService.findAll).toHaveBeenCalledOnce();
  });
});
