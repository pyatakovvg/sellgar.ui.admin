export interface WriteOffRecordInventoryInput {
  commandId: string;
  recordUuid: string;
  expectedVersion: number;
  quantity: number;
  reason?: string | null;
  sourceUuid?: string | null;
  createdBy?: string | null;
}
