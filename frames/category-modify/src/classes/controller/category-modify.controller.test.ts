import type { CategoryServiceInterface, CreateCategoryInput, UpdateCategoryInput } from '@library/domain';
import type { FrameServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { CategoryModifyController } from './category-modify.controller.ts';

const createController = () => {
  const categoryService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findByUuid: vi.fn(),
    update: vi.fn(),
  } as unknown as CategoryServiceInterface;
  const frameService = {
    close: vi.fn(),
  } as unknown as FrameServiceInterface;
  const revalidateService = {
    revalidate: vi.fn(),
  } as unknown as RevalidateServiceInterface;

  return {
    categoryService,
    controller: new CategoryModifyController(categoryService, frameService, revalidateService),
    frameService,
    revalidateService,
  };
};

const createPayload = (file: File): CreateCategoryInput => ({
  code: 'category',
  name: 'Категория',
  description: 'Описание',
  image: { file, alt: null },
});

describe('CategoryModifyController', () => {
  it('передаёт объект формы и File в create без преобразования', async () => {
    const fixture = createController();
    const file = new File(['image'], 'category.png', { type: 'image/png' });
    const payload = createPayload(file);

    await fixture.controller.action({
      params: {},
      payload,
      props: {},
      request: new Request('http://localhost/categories', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.categoryService.create).toHaveBeenCalledWith(payload);
    expect(vi.mocked(fixture.categoryService.create).mock.calls[0][0].image?.file).toBe(file);
    expect(fixture.revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(fixture.frameService.close).toHaveBeenCalledOnce();
  });

  it('передаёт update payload в сервис без преобразования', async () => {
    const fixture = createController();
    const payload: UpdateCategoryInput = {
      ...createPayload(new File(['image'], 'category.png', { type: 'image/png' })),
      uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f',
      version: 3,
    };

    await fixture.controller.action({
      params: {},
      payload,
      props: { uuid: payload.uuid },
      request: new Request('http://localhost/categories', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.categoryService.update).toHaveBeenCalledWith(payload.uuid, payload);
    expect(fixture.categoryService.create).not.toHaveBeenCalled();
  });
});
