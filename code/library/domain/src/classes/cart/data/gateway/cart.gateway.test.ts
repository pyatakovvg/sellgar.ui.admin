import axios, { AxiosError, type AxiosAdapter, type InternalAxiosRequestConfig } from 'axios';
import { ConflictException, type RequestExecutorInterface, type RequestOperation } from '@sellgar/app';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { ConfigInterface } from '../../../../infrastructure/config/config.interface.ts';
import type { DeviceServiceInterface } from '../../../../infrastructure/device/service/device-service.interface.ts';
import { CartService } from '../../application/cart.service.ts';
import { CartEntity } from '../../domain/cart.entity.ts';
import { CartItemEntity } from '../../domain/cart-item.entity.ts';
import { CartSummaryEntity } from '../../domain/cart-summary.entity.ts';
import { CartGateway } from './cart.gateway.ts';

const uuid = '6e12f78a-ab0d-4bbe-bc6e-af67c15da75d';
const ownerUuid = 'a7bded5f-24ee-4d2a-b13f-2436f4f5337f';
const recordUuid = 'fb5713a5-6ff2-45b8-95be-41e6645fb58d';
const rowVersion = '9007199254740993';
const metadata = {
  uuid,
  ownerUuid,
  version: '9007199254740995',
  createdAt: '2026-11-16T12:00:00.000Z',
  updatedAt: '2026-11-16T12:00:00.000Z',
  closedAt: null,
};
const createCart = () => ({
  ...metadata,
  shop: { uuid: ownerUuid, name: 'Центр' },
  items: [
    {
      recordUuid,
      offerUuid: uuid,
      productUuid: uuid,
      variantUuid: uuid,
      productName: 'Кофе',
      variantName: 'Арабика',
      article: 'COFFEE',
      clarifications: ['250 г'],
      imageUuid: null,
      quantity: 1,
      version: rowVersion,
      availableQuantity: 5,
      price: { uuid, value: '9007199254740993.50', currencyCode: 'RUB' },
      subtotal: '9007199254740993.50',
      reasons: [] as string[],
      message: null as string | null,
      canCheckout: true,
      canOpenProduct: true,
      canIncrease: true,
      canDecrease: false,
      canRemove: true,
    },
  ],
  currencyCode: 'RUB',
  itemsTotal: '9007199254740993.50' as string | null,
});

describe('Cart domain through HTTP transport', () => {
  const previousAdapter = axios.defaults.adapter;
  let response: unknown;
  let requests: InternalAxiosRequestConfig[];
  let gateway: CartGateway;
  let service: CartService;
  let executor: RequestExecutorInterface;

  beforeEach(() => {
    requests = [];
    response = createCart();
    axios.defaults.adapter = (async (config) => {
      requests.push(config);
      return { config, data: response, headers: {}, status: 200, statusText: 'OK' };
    }) satisfies AxiosAdapter;
    executor = {
      run: vi.fn(async (_options, operation: RequestOperation<unknown>) =>
        operation({ signal: new AbortController().signal }),
      ),
    } as unknown as RequestExecutorInterface;
    gateway = new CartGateway(
      { get: () => 'http://localhost:4020' } as unknown as ConfigInterface,
      { getUniqueId: () => 'cart-test-device' } as DeviceServiceInterface,
      executor,
    );
    service = new CartService(gateway);
  });

  afterEach(() => {
    axios.defaults.adapter = previousAdapter;
    vi.restoreAllMocks();
  });

  it('loads a filtered, paginated summary without coercing versions', async () => {
    response = {
      data: [{ ...metadata, shop: { uuid, name: null }, itemsCount: 2 }],
      meta: { totalRows: 11, limit: 5, offset: 5 },
    };
    const result = await service.getAll({ shopUuid: uuid, ownerUuid, status: 'closed', limit: 5, offset: 5 });
    expect(result.data[0]).toBeInstanceOf(CartSummaryEntity);
    expect(result.data[0].version).toBe(metadata.version);
    expect(result.meta).toEqual({ totalRows: 11, limit: 5, offset: 5 });
    expect(requests[0]).toMatchObject({
      method: 'get',
      url: 'http://localhost:4020/v1/carts',
      withCredentials: true,
      params: { shopUuid: uuid, ownerUuid, status: 'closed', limit: 5, offset: 5 },
    });
    expect(requests[0].headers.get('X-Device-Id')).toBe('cart-test-device');
    expect(requests[0].signal).toBeInstanceOf(AbortSignal);
  });

  it('loads nested entities preserving exact prices and item versions', async () => {
    const cart = await service.findByUuid(uuid);
    expect(cart).toBeInstanceOf(CartEntity);
    expect(cart.items[0]).toBeInstanceOf(CartItemEntity);
    expect(cart.items[0].price?.value).toBe('9007199254740993.50');
    expect(cart.items[0].version).toBe(rowVersion);
    expect(cart.version).toBe(metadata.version);
    expect(requests[0].url).toBe(`http://localhost:4020/v1/carts/${uuid}`);
  });

  it.each([
    ['hidden', 'Временно недоступен'],
    ['not_sold', 'Товар больше не продается'],
    ['out_of_stock', 'Нет в наличии'],
  ])('keeps an unavailable item with reason %s', async (reason, message) => {
    const cart = createCart();
    cart.items[0] = {
      ...cart.items[0],
      reasons: [reason],
      message,
      canCheckout: false,
      canIncrease: false,
      availableQuantity: 0,
    };
    response = cart;
    const result = await service.findByUuid(uuid);
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      productName: 'Кофе',
      reasons: [reason],
      message,
      canCheckout: false,
      canRemove: true,
    });
  });

  it('loads a public cart with nullable data and no internal projection fields', async () => {
    const cart = createCart();
    response = {
      ...cart,
      shop: { uuid, name: null },
      itemsTotal: null,
      items: [
        {
          ...cart.items[0],
          offerUuid: null,
          productUuid: null,
          variantUuid: null,
          productName: null,
          variantName: null,
          article: null,
          price: null,
          subtotal: null,
          availableQuantity: null,
          reasons: ['sync_pending'],
          message: 'Данные уточняются',
          canCheckout: false,
        },
      ],
    };
    expect((await service.findByUuid(uuid)).items[0].price).toBeNull();
  });

  it('preserves a closed cart and server permissions', async () => {
    const cart = createCart();
    response = {
      ...cart,
      closedAt: metadata.createdAt,
      items: [{ ...cart.items[0], canCheckout: false, canIncrease: false, canDecrease: false, canRemove: false }],
    };
    const result = await service.findByUuid(uuid);
    expect(result.closedAt).toBe(metadata.createdAt);
    expect(result.items[0].canRemove).toBe(false);
  });

  it('adds quantity and strips extra body fields', async () => {
    response = { cartUuid: uuid, recordUuid, cartVersion: '10', quantity: 2 };
    const input = { recordUuid, quantity: 2, ownerUuid, shopUuid: uuid, ignored: true };
    const result = await service.addItem(uuid, input);
    expect(result.quantity).toBe(2);
    expect(result.cartVersion).toBe('10');
    expect(requests[0]).toMatchObject({ method: 'post', url: `http://localhost:4020/v1/carts/${uuid}/items` });
    expect(JSON.parse(requests[0].data)).toEqual({ recordUuid, quantity: 2 });
    expect(input.ownerUuid).toBe(ownerUuid);
  });

  it('sends the expected item version unchanged for absolute quantity', async () => {
    response = { cartUuid: uuid, recordUuid, cartVersion: '10', quantity: 3 };
    await service.setItemQuantity(uuid, recordUuid, { version: rowVersion, quantity: 3 });
    expect(requests[0]).toMatchObject({
      method: 'patch',
      url: `http://localhost:4020/v1/carts/${uuid}/items/${recordUuid}`,
    });
    expect(JSON.parse(requests[0].data)).toEqual({ version: rowVersion, quantity: 3 });
  });

  it('serializes a JSON body for DELETE and accepts a result without quantity', async () => {
    response = { cartUuid: uuid, recordUuid, cartVersion: '10' };
    const result = await service.removeItem(uuid, recordUuid, { version: rowVersion });
    expect(requests[0]).toMatchObject({
      method: 'delete',
      url: `http://localhost:4020/v1/carts/${uuid}/items/${recordUuid}`,
    });
    expect(JSON.parse(requests[0].data)).toEqual({ version: rowVersion });
    expect(requests[0].headers.get('Content-Type')).toContain('application/json');
    expect(result.quantity).toBeUndefined();
  });

  it('reuses the validated body on executor retry', async () => {
    response = { cartUuid: uuid, recordUuid, cartVersion: '10', quantity: 2 };
    vi.mocked(executor.run).mockImplementationOnce(async (_options, operation) => {
      const context = { signal: new AbortController().signal };
      await operation(context);
      return operation(context);
    });
    await service.addItem(uuid, { recordUuid, quantity: 2 });
    expect(requests).toHaveLength(2);
    expect(requests[0].data).toBe(requests[1].data);
  });

  it.each([
    { limit: 0 },
    { limit: 101 },
    { offset: -1 },
    { offset: Number.MAX_SAFE_INTEGER + 1 },
    { shopUuid: 'invalid' },
    { status: 'other' },
  ])('rejects invalid query %j before sending', async (input) => {
    await expect(service.getAll(input as never)).rejects.toBeDefined();
    expect(requests).toHaveLength(0);
  });

  it.each([0, -1, 1.5, 2147483648])('rejects invalid quantity %s', async (quantity) => {
    await expect(service.addItem(uuid, { recordUuid, quantity })).rejects.toBeDefined();
    expect(requests).toHaveLength(0);
  });

  it.each(['0', '-1', '1.5', 9007199254740992])('rejects an invalid expected version %s', async (version) => {
    await expect(service.removeItem(uuid, recordUuid, { version: version as string })).rejects.toBeDefined();
    expect(requests).toHaveLength(0);
  });

  it('rejects invalid route UUIDs without a request', async () => {
    await expect(service.findByUuid('../other')).rejects.toThrow();
    await expect(service.setItemQuantity(uuid, '../other', { version: '1', quantity: 1 })).rejects.toThrow();
    expect(requests).toHaveLength(0);
  });

  it.each([
    { price: { uuid, value: 1.5, currencyCode: 'RUB' } },
    { availableQuantity: -1 },
    { availableQuantity: '5' },
    { quantity: 0 },
    { version: 12 },
    { canCheckout: 'yes' },
    { reasons: ['unknown'] },
    { productName: undefined },
  ])('rejects a malformed nested item %j', async (patch) => {
    const cart = createCart();
    response = { ...cart, items: [{ ...cart.items[0], ...patch }] };
    await expect(service.findByUuid(uuid)).rejects.toBeDefined();
  });

  it('does not turn a stale item conflict into a successful local edit', async () => {
    axios.defaults.adapter = async (config) => {
      throw new AxiosError('Conflict', AxiosError.ERR_BAD_REQUEST, config, undefined, {
        config,
        data: { status: 409, title: 'Conflict' },
        headers: {},
        status: 409,
        statusText: 'Conflict',
      });
    };
    await expect(service.setItemQuantity(uuid, recordUuid, { version: '1', quantity: 2 })).rejects.toBeInstanceOf(
      ConflictException,
    );
  });
});
