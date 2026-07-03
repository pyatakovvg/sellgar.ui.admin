import { afterEach, describe, expect, it, vi } from 'vitest';

import { BadRequestException } from './exeptions/bad-request.exception.ts';
import { NotFoundException } from './exeptions/not-found.exception.ts';
import { ServiceUnavailableException } from './exeptions/service-unavailable.exception.ts';
import { HttpClient } from './http-client.ts';

import type { DeviceServiceInterface } from '../device';

const createClient = (): HttpClient => {
  const deviceService: DeviceServiceInterface = {
    getUniqueId: () => 'test-device-id',
  };

  return new HttpClient(deviceService);
};

const mockFetch = (handler: typeof fetch): void => {
  vi.stubGlobal('fetch', vi.fn(handler));
};

const jsonResponse = (payload: unknown, init?: ResponseInit): Response => {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
};

describe('HttpClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('maps HTTP response statuses to matching exceptions', async () => {
    mockFetch(async () => jsonResponse({ message: 'Not found' }, { status: 404 }));

    await expect(createClient().get('/missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('uses BadRequestException for unknown client errors', async () => {
    mockFetch(async () => jsonResponse({ message: 'Invalid' }, { status: 418 }));

    await expect(createClient().get('/invalid')).rejects.toBeInstanceOf(BadRequestException);
  });

  it('does not mask aborted requests as backend unavailable', async () => {
    const abortError = new DOMException('Aborted', 'AbortError');
    const controller = new AbortController();

    controller.abort();
    mockFetch(async () => {
      throw abortError;
    });

    await expect(createClient().get('/cancelled', { signal: controller.signal })).rejects.toBe(abortError);
    await expect(createClient().get('/cancelled', { signal: controller.signal })).rejects.not.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });

  it('keeps client usable after aborting its internal controller', async () => {
    const client = createClient();
    const fetchMock = vi.fn(async () => jsonResponse({ ok: true }, { status: 200 }));

    vi.stubGlobal('fetch', fetchMock);

    client.abort();

    await expect(client.get('/alive')).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('skips empty array query params', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ ok: true }, { status: 200 }));

    vi.stubGlobal('fetch', fetchMock);

    await createClient().get('/items', {
      params: {
        status: ['active', undefined, null, ''],
      },
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/items?status=active',
      expect.objectContaining({ method: 'GET' }),
    );
  });
});
