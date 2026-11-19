export interface AdjustRecordInventoryInput {
  recordUuid: string;
  expectedVersion: number;
  quantity: number;
  reason?: string | null;
  sourceUuid?: string | null;
  createdBy?: string | null;
}
