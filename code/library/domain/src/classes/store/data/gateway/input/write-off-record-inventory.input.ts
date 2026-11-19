export interface WriteOffRecordInventoryInput {
  recordUuid: string;
  expectedVersion: number;
  quantity: number;
  reason?: string | null;
  sourceUuid?: string | null;
  createdBy?: string | null;
}
