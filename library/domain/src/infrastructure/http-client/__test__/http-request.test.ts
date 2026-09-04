import axios, { AxiosError } from 'axios';
import { UnauthorizedException } from '@sellgar/app';
import { describe, expect, it } from 'vitest';

import { HttpRequest } from '../index.ts';

describe('HttpRequest', () => {
  it('maps Axios-compatible errors without relying on constructor identity', async () => {
    const request = new HttpRequest({
      deviceId: 'test-device-id',
      signal: new AbortController().signal,
    });
    const axiosError = {
      config: { method: 'get', url: '/profile' },
      isAxiosError: true,
      message: 'Unauthorized',
      name: 'AxiosError',
      response: {
        data: { status: 401, title: 'Unauthorized' },
        status: 401,
      },
      toJSON: () => ({}),
    } as unknown as AxiosError;

    expect(axios.isAxiosError(axiosError)).toBe(true);
    expect(axiosError).not.toBeInstanceOf(AxiosError);

    const reject = Reflect.get(request, 'onRejected') as (error: unknown) => Promise<never>;

    await expect(reject(axiosError)).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
