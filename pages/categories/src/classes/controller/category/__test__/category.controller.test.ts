import { type CategoryResultEntity, type CategoryServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { CategoryController } from '../category.controller.ts';

describe('CategoryController', () => {
  it('загружает дерево категорий через предметный сервис', async () => {
    const result = { data: [], meta: {} } as CategoryResultEntity;
    const categoryService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as CategoryServiceInterface;
    const controller = new CategoryController(categoryService);

    await expect(controller.loader()).resolves.toBe(result);
    expect(categoryService.findAll).toHaveBeenCalledOnce();
  });
});
