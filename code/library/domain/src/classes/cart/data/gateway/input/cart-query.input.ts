export interface CartQueryInput {
  shopUuid?: string;
  ownerUuid?: string;
  status?: 'active' | 'closed';
  limit?: number;
  offset?: number;
}
