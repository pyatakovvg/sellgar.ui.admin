export interface ProductChangesListener {
  readonly updated: (productUuid: string, version: number) => Promise<void>;
}
