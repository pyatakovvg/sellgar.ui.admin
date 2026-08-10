import { type CategoryResultEntity, type CategoryServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { CategoryOptionsController } from '../category-options.controller.ts';

describe('CategoryOptionsController', () => {
  it('загружает категории для формы', async () => {
    const result = { data: [], meta: {} } as CategoryResultEntity;
    const categoryService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as CategoryServiceInterface;
    const controller = new CategoryOptionsController(categoryService);

    await expect(controller.loader()).resolves.toBe(result);
    expect(categoryService.findAll).toHaveBeenCalledOnce();
  });
});
