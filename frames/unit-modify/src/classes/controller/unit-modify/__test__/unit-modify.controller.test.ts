import type { UnitEntity, UnitServiceInterface } from '@library/domain';
import type { RevalidateServiceInterface } from '@sellgar/app';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { UnitModifyController } from '../unit-modify.controller.ts';

const createController = () => {
  const unitService = {
    create: vi.fn(),
    findByUuid: vi.fn(),
    update: vi.fn(),
  } as unknown as UnitServiceInterface;
  const navigateService = { close: vi.fn() } as unknown as NavigateServiceInterface;
  const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;

  return {
    controller: new UnitModifyController(unitService, navigateService, revalidateService),
    navigateService,
    revalidateService,
    unitService,
  };
};

const payload = {
  code: 'kg',
  name: 'Килограмм',
  description: 'Единица массы',
};

describe('UnitModifyController', () => {
  it('не загружает размерность для create frame', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
        params: {},
        request: new Request('http://localhost/units'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBeUndefined();

    expect(fixture.unitService.findByUuid).not.toHaveBeenCalled();
  });

  it('загружает размерность по frame props', async () => {
    const fixture = createController();
    const unit = { uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f' } as UnitEntity;
    vi.mocked(fixture.unitService.findByUuid).mockResolvedValue(unit);

    await expect(
      fixture.controller.loader({
        params: {},
        params: { uuid: unit.uuid },
        request: new Request('http://localhost/units'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBe(unit);

    expect(fixture.unitService.findByUuid).toHaveBeenCalledWith(unit.uuid);
  });

  it('закрывает frame по пользовательской команде', async () => {
    const fixture = createController();

    await fixture.controller.close();

    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });

  it('создаёт размерность без UI-полей update-команды', async () => {
    const fixture = createController();

    await fixture.controller.action({
      params: {},
      payload,
      params: {},
      request: new Request('http://localhost/units', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.unitService.create).toHaveBeenCalledWith(payload);
    expect(fixture.revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });

  it('требует version и формирует update-команду для открытой размерности', async () => {
    const fixture = createController();
    const uuid = 'c7fd8d23-c843-4d47-8d23-33698a5f034f';

    await fixture.controller.action({
      params: {},
      payload: { ...payload, version: 4 },
      params: { uuid },
      request: new Request('http://localhost/units', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.unitService.update).toHaveBeenCalledWith(uuid, { ...payload, version: 4 });
  });

  it('не отправляет update без version', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.action({
        params: {},
        payload,
        params: { uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f' },
        request: new Request('http://localhost/units', { method: 'POST' }),
        signal: new AbortController().signal,
      }),
    ).rejects.toThrow('Не передана версия размерности.');

    expect(fixture.unitService.update).not.toHaveBeenCalled();
  });
});
