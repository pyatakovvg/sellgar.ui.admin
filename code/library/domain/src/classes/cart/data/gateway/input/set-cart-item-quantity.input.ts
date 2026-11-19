export interface SetCartItemQuantityInput {
  /** Версия изменяемой позиции из CartItemEntity.version. */
  version: string;
  quantity: number;
}
