import { describe, expect, it, vi } from 'vitest';

import { StorageServiceInterface } from '../../storage/service/storage-service.interface.ts';
import { DeviceService } from './device.service.ts';

interface DeviceStorage {
  deviceId: string;
}

describe('DeviceService', () => {
  it('возвращает сохранённый идентификатор без повторной записи', () => {
    const storage = createStorage('saved-device-id');
    const service = new DeviceService(storage);

    expect(service.getUniqueId()).toBe('saved-device-id');
    expect(storage.set).not.toHaveBeenCalled();
  });

  it('создаёт и сохраняет идентификатор при первом обращении', () => {
    const storage = createStorage(undefined);
    const service = new DeviceService(storage);

    const deviceId = service.getUniqueId();

    expect(deviceId).not.toBe('');
    expect(storage.set).toHaveBeenCalledWith('deviceId', deviceId);
  });
});

function createStorage(deviceId: string | undefined): StorageServiceInterface<DeviceStorage> {
  return {
    get: vi.fn(() => deviceId),
    set: vi.fn(),
    remove: vi.fn(),
  } as unknown as StorageServiceInterface<DeviceStorage>;
}
