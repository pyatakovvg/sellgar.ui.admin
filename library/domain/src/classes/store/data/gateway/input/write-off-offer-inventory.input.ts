export interface WriteOffOfferInventoryInput {
  commandId: string;
  offerUuid: string;
  expectedVersion: number;
  quantity: number;
  reason?: string | null;
  sourceUuid?: string | null;
  createdBy?: string | null;
}
