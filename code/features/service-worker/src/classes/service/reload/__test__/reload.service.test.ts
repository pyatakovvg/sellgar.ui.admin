import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ReloadService } from '../reload.service.ts';

const KEY = 'management-panel:pending-update-build-id';
const service = (buildId: string, requireBuildIdChange = true) => new ReloadService({ buildId, requireBuildIdChange });

describe('ReloadService', () => {
  beforeEach(() => window.sessionStorage.clear());

  it('не проверяет обновление без маркера', () => {
    expect(service('current').verify()).toBe('none');
  });

  it('подтверждает смену production сборки и удаляет маркер', () => {
    window.sessionStorage.setItem(KEY, 'previous');
    expect(service('current').verify()).toBe('updated');
    expect(window.sessionStorage.getItem(KEY)).toBeNull();
  });

  it('не подтверждает прежнюю production сборку', () => {
    window.sessionStorage.setItem(KEY, 'current');
    expect(service('current').verify()).toBe('verification-failed');
  });

  it('в dev не требует смены идентификатора сборки', () => {
    window.sessionStorage.setItem(KEY, 'development');
    expect(service('development', false).verify()).toBe('updated');
  });

  it('работает при недоступном sessionStorage', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(service('current').verify()).toBe('none');
    getItem.mockRestore();
  });
});
