import { parseRealtimeDelivery } from './realtime-delivery.ts';

describe('parseRealtimeDelivery', () => {
  it('parses the shared realtime envelope', () => {
    expect(parseRealtimeDelivery(createDelivery())).toEqual(createDelivery());
  });

  it('rejects an invalid audience', () => {
    expect(() =>
      parseRealtimeDelivery({
        ...createDelivery(),
        audience: { type: 'unknown', uuid: 'not-a-uuid' },
      }),
    ).toThrow('Realtime delivery has an invalid audience.');
  });
});

const createDelivery = () => ({
  audience: {
    type: 'user',
    uuid: '66713624-6013-46b1-97c9-0f0166594491',
  },
  deliveryId: 'd40e2681-2898-473a-98cc-0f5a76265310',
  eventType: 'product.updated',
  expiresAt: '2026-08-08T12:05:00.000Z',
  occurredAt: '2026-08-08T12:00:00.000Z',
  payload: {
    productUuid: '39782b12-1077-4b75-94d2-c783e2ce8817',
    version: 5,
  },
  schemaVersion: 1,
  sequence: '42',
});
