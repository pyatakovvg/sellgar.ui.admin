import { afterEach, describe, expect, it, vi } from 'vitest';

import { BadGatewayException } from './exceptions/bad-gateway.exception.ts';
import { BadRequestException } from './exceptions/bad-request.exception.ts';
import { ConflictException } from './exceptions/conflict.exception.ts';
import { ForbiddenException } from './exceptions/forbidden.exception.ts';
import { GatewayTimeoutException } from './exceptions/gateway-timeout.exception.ts';
import { HttpException } from './exceptions/http.exception.ts';
import { InternalServerErrorException } from './exceptions/internal-server-error.exception.ts';
import { LockoutException } from './exceptions/lockout.exception.ts';
import { MethodNotAllowedException } from './exceptions/method-not-allowed.exception.ts';
import { NotFoundException } from './exceptions/not-found.exception.ts';
import { RequestTimeoutException } from './exceptions/request-timeout.exception.ts';
import { ServiceUnavailableException } from './exceptions/service-unavailable.exception.ts';
import { TooManyRequestsException } from './exceptions/too-many-requests.exception.ts';
import { UnauthorizedException } from './exceptions/unauthorized.exception.ts';
import { UnprocessableEntityException } from './exceptions/unprocessable-entity.exception.ts';
import { WafBlockedException } from './exceptions/waf-blocked.exception.ts';
import { HttpClient } from './http-client.ts';

import type { DeviceServiceInterface } from '../device/service/device-service.interface.ts';

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

  it.each([
    [400, BadRequestException],
    [401, UnauthorizedException],
    [403, ForbiddenException],
    [404, NotFoundException],
    [405, MethodNotAllowedException],
    [408, RequestTimeoutException],
    [409, ConflictException],
    [418, WafBlockedException],
    [422, UnprocessableEntityException],
    [423, LockoutException],
    [429, TooManyRequestsException],
    [500, InternalServerErrorException],
    [502, BadGatewayException],
    [503, ServiceUnavailableException],
    [504, GatewayTimeoutException],
  ])('maps HTTP %s response to matching exception', async (status, ExceptionConstructor) => {
    mockFetch(async () => jsonResponse({ message: `Status ${status}` }, { status }));

    await expect(createClient().get('/status')).rejects.toBeInstanceOf(ExceptionConstructor);
  });

  it('preserves unknown response statuses with base HttpException', async () => {
    mockFetch(async () => jsonResponse({ message: 'Unavailable For Legal Reasons' }, { status: 451 }));

    await expect(createClient().get('/invalid')).rejects.toMatchObject({
      message: 'Unavailable For Legal Reasons',
      getStatus: expect.any(Function),
    });

    await expect(createClient().get('/invalid')).rejects.toSatisfy((error: unknown) => {
      return error instanceof HttpException && error.getStatus() === 451;
    });
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
