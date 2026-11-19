import type { ProductResultEntity, ProductServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { ProductListController } from '../product-list.controller.ts';
import { ProductSearchStore } from '../../../store/product-search/product-search.store.ts';

const page: ProductResultEntity = { items: [], total: 0, limit: 20, offset: 0 };

const createFixture = () => {
  const findAll = vi.fn<(...args: Parameters<ProductServiceInterface['findAll']>) => Promise<ProductResultEntity>>();
  const service = { findAll } as unknown as ProductServiceInterface;
  const controller = new ProductListController(service, new ProductSearchStore());
  return { controller, findAll };
};

describe('ProductListController', () => {
  it('не загружает каталог при создании контроллера и пустом запросе', async () => {
    const { controller, findAll } = createFixture();
    await controller.search('');
    expect(controller.options).toEqual([]);
    expect(controller.loading).toBe(false);
    expect(findAll).not.toHaveBeenCalled();
  });

  it('передает поиск серверу и показывает состояние запроса до ответа', async () => {
    const { controller, findAll } = createFixture();
    const pending: ((value: ProductResultEntity) => void)[] = [];
    findAll.mockImplementation(() => new Promise((resolve) => pending.push(resolve)));

    const search = controller.search(' май ');
    expect(findAll).toHaveBeenCalledWith({ term: 'май', limit: 20, offset: 0 });
    expect(controller.loading).toBe(true);

    pending[0](page);
    await search;
    expect(controller.loading).toBe(false);
    expect(controller.options).toBe(page.items);
  });

  it('поздний ответ старого поиска не заменяет новую выдачу', async () => {
    const { controller, findAll } = createFixture();
    const pending: ((value: ProductResultEntity) => void)[] = [];
    findAll.mockImplementation(() => new Promise((resolve) => pending.push(resolve)));
    const older = controller.search('май');
    const newer = controller.search('шамп');
    const newestPage = { ...page, items: [] };

    pending[1](newestPage);
    await newer;
    pending[0](page);
    await older;

    expect(controller.options).toBe(newestPage.items);
    expect(controller.loading).toBe(false);
  });

  it('закрытие поиска исключает применение ожидающего ответа', async () => {
    const { controller, findAll } = createFixture();
    const pending: ((value: ProductResultEntity) => void)[] = [];
    findAll.mockImplementation(() => new Promise((resolve) => pending.push(resolve)));
    const search = controller.search('май');
    await controller.search('');
    pending[0](page);
    await search;
    expect(controller.options).not.toBe(page.items);
    expect(controller.options).toEqual([]);
    expect(controller.loading).toBe(false);
  });

  it('ошибка запроса завершает загрузку и оставляет сообщение', async () => {
    const { controller, findAll } = createFixture();
    findAll.mockRejectedValue(new Error('network'));
    await controller.search('май');
    expect(controller.loading).toBe(false);
    expect(controller.error).toContain('Повторите поиск');
    expect(controller.options).toEqual([]);
  });

  it('после dispose контроллер не применяет ответ и не запускает запросы', async () => {
    const { controller, findAll } = createFixture();
    const pending: ((value: ProductResultEntity) => void)[] = [];
    findAll.mockImplementation(() => new Promise((resolve) => pending.push(resolve)));
    const search = controller.search('май');
    controller.dispose();
    pending[0](page);
    await search;
    await controller.search('шамп');
    expect(findAll).toHaveBeenCalledOnce();
    expect(controller.loading).toBe(false);
    expect(controller.options).not.toBe(page.items);
  });
});
