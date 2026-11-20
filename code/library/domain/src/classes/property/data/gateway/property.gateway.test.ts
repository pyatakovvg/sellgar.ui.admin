import axios, { type AxiosAdapter, type InternalAxiosRequestConfig } from 'axios';
import type { RequestExecutorInterface, RequestOperation } from '@sellgar/app';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import type { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { PropertyEntity } from '../../domain/property.entity.ts';
import { PropertyGateway } from './property.gateway.ts';

describe('Property catalogue through HTTP transport', () => {
  const previousAdapter = axios.defaults.adapter;
  const properties = Array.from({ length: 59 }, (_, index) => ({
    code: `property-${index.toString().padStart(2, '0')}`,
    name: `Свойство ${index}`,
    kind: 'TEXT',
    description: null,
    unitCode: null,
    version: 1,
    options: [],
    createdAt: '2026-11-20T12:00:00.000Z',
    updatedAt: '2026-11-20T12:00:00.000Z',
  }));
  let requests: InternalAxiosRequestConfig[];
  let gateway: PropertyGateway;

  beforeEach(() => {
    requests = [];
    axios.defaults.adapter = (async (config) => {
      requests.push(config);
      const offset = Number(config.params?.offset ?? 0);
      return {
        config,
        data: { items: properties.slice(offset, offset + 50), total: properties.length, limit: 50, offset },
        headers: {},
        status: 200,
        statusText: 'OK',
      };
    }) satisfies AxiosAdapter;
    const executor = {
      run: async (_options: unknown, operation: RequestOperation<unknown>) =>
        operation({ signal: new AbortController().signal }),
    } as RequestExecutorInterface;
    gateway = new PropertyGateway(
      { get: () => 'https://admin.test/api' } as unknown as ConfigInterface,
      { getUniqueId: () => 'property-test-device' } as DeviceServiceInterface,
      executor,
    );
  });

  afterEach(() => {
    axios.defaults.adapter = previousAdapter;
  });

  it('returns every property for templates beyond the first HTTP page', async () => {
    const result = await gateway.findAll();

    expect(result.items).toHaveLength(59);
    expect(result.items.map((item) => item.code)).toEqual(properties.map((item) => item.code));
    expect(result.items.every((item) => item instanceof PropertyEntity)).toBe(true);
    expect(result).toMatchObject({ total: 59, limit: 59, offset: 0 });
    expect(requests.map((request) => request.params?.offset ?? 0)).toEqual([0, 50]);
    expect(requests[1].signal).toBe(requests[0].signal);
  });

  it('does not return a partial catalogue when a later page fails', async () => {
    const adapter = axios.defaults.adapter as AxiosAdapter;
    axios.defaults.adapter = async (config) => {
      if (Number(config.params?.offset) > 0) throw new Error('Next page unavailable');
      return adapter(config);
    };

    await expect(gateway.findAll()).rejects.toThrow('Next page unavailable');
  });
});
