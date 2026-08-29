import type { RequestExecutionOptions, RequestExecutorInterface, RequestOperation } from '@sellgar/app-v2';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { ConfigInterface } from '../../../../../infrastructure/config/config.interface.ts';
import type { DeviceServiceInterface } from '../../../../../infrastructure/device/service/device-service.interface.ts';
import { HttpRequest } from '../../../../../infrastructure/http-client/index.ts';

import { AuthGateway } from '../auth.gateway.ts';

describe('AuthGateway socket ticket', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('requests and validates a short-lived socket ticket', async () => {
    const post = vi.spyOn(HttpRequest.prototype, 'post').mockResolvedValue({
      expiresAt: '2026-08-08T12:05:00.000Z',
      ticket: 'signed-ticket',
    });
    const gateway = new AuthGateway(createConfig(), createDeviceService(), createRequestExecutor());

    await expect(gateway.issueSocketTicket()).resolves.toEqual(
      expect.objectContaining({
        expiresAt: '2026-08-08T12:05:00.000Z',
        ticket: 'signed-ticket',
      }),
    );
    expect(post).toHaveBeenCalledWith('http://localhost:4020/v1/auth/socket-ticket', undefined);
  });

  it('rejects an invalid socket ticket response', async () => {
    vi.spyOn(HttpRequest.prototype, 'post').mockResolvedValue({ ticket: 42 });
    const gateway = new AuthGateway(createConfig(), createDeviceService(), createRequestExecutor());

    await expect(gateway.issueSocketTicket()).rejects.toBeDefined();
  });
});

const createConfig = () => {
  return {
    get: vi.fn(() => 'http://localhost:4020'),
  } as unknown as ConfigInterface;
};

const createDeviceService = () => {
  return {
    getUniqueId: vi.fn(() => 'test-device-id'),
  } as unknown as DeviceServiceInterface;
};

const createRequestExecutor = () => {
  return {
    cancelAll: vi.fn(),
    cancelScope: vi.fn(),
    run: vi.fn(async <T>(_options: RequestExecutionOptions, operation: RequestOperation<T>): Promise<T> => {
      return operation({ signal: new AbortController().signal });
    }),
  } as unknown as RequestExecutorInterface;
};
