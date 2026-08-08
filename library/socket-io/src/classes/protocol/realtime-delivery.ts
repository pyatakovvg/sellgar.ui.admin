import { isDateString, isUUID } from 'class-validator';

export type RealtimeAudienceType = 'job' | 'shop' | 'tenant' | 'user';

export interface RealtimeAudience {
  readonly type: RealtimeAudienceType;
  readonly uuid: string;
}

export interface RealtimeDelivery<TPayload = unknown> {
  readonly audience: RealtimeAudience;
  readonly deliveryId: string;
  readonly eventType: string;
  readonly expiresAt: string;
  readonly occurredAt: string;
  readonly payload: TPayload;
  readonly schemaVersion: number;
  readonly sequence: string;
}

const AUDIENCE_TYPES: readonly RealtimeAudienceType[] = ['job', 'shop', 'tenant', 'user'];

export const parseRealtimeDelivery = (value: unknown): RealtimeDelivery => {
  if (!isRecord(value)) {
    throw new Error('Realtime delivery must be an object.');
  }

  const audience = parseAudience(value.audience);

  if (typeof value.deliveryId !== 'string' || !isUUID(value.deliveryId)) {
    throw new Error('Realtime delivery has an invalid deliveryId.');
  }

  if (typeof value.sequence !== 'string' || !/^\d+$/.test(value.sequence)) {
    throw new Error('Realtime delivery has an invalid sequence.');
  }

  if (typeof value.eventType !== 'string' || value.eventType.length === 0) {
    throw new Error('Realtime delivery has an invalid eventType.');
  }

  if (!Number.isInteger(value.schemaVersion) || Number(value.schemaVersion) < 1) {
    throw new Error('Realtime delivery has an invalid schemaVersion.');
  }

  if (
    typeof value.occurredAt !== 'string' ||
    typeof value.expiresAt !== 'string' ||
    !isDateString(value.occurredAt) ||
    !isDateString(value.expiresAt)
  ) {
    throw new Error('Realtime delivery has invalid dates.');
  }

  return {
    audience,
    deliveryId: value.deliveryId,
    eventType: value.eventType,
    expiresAt: value.expiresAt,
    occurredAt: value.occurredAt,
    payload: value.payload,
    schemaVersion: value.schemaVersion as number,
    sequence: value.sequence,
  };
};

const parseAudience = (value: unknown): RealtimeAudience => {
  if (
    !isRecord(value) ||
    !AUDIENCE_TYPES.includes(value.type as RealtimeAudienceType) ||
    typeof value.uuid !== 'string' ||
    !isUUID(value.uuid)
  ) {
    throw new Error('Realtime delivery has an invalid audience.');
  }

  return {
    type: value.type as RealtimeAudienceType,
    uuid: value.uuid,
  };
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};
