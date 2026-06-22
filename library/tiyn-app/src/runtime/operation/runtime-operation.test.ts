import { describe, expect, it } from 'vitest';

import { createRuntimeRevisionGuard, executeRuntimeOperation, type RuntimeRevisionSource } from './';

describe('runtime operation', () => {
  it('returns completed result when operation resolves', async () => {
    const result = await executeRuntimeOperation(null, () => 'ready');

    expect(result).toEqual({
      type: 'completed',
      value: 'ready',
    });
  });

  it('returns failed result when operation rejects without lifecycle interruption', async () => {
    const error = new Error('Операция завершилась с ошибкой.');
    const source = new TestRevisionSource();
    const result = await executeRuntimeOperation(createRuntimeRevisionGuard(source), () => {
      throw error;
    });

    expect(result).toEqual({
      error,
      type: 'failed',
    });
  });

  it('returns interrupted result when revision changes before rejection', async () => {
    const error = new Error('Операция была прервана.');
    const source = new TestRevisionSource();
    const result = await executeRuntimeOperation(createRuntimeRevisionGuard(source), () => {
      source.bump();
      throw error;
    });

    expect(result).toEqual({
      error,
      type: 'interrupted',
    });
  });
});

class TestRevisionSource implements RuntimeRevisionSource {
  private currentRevision = 0;

  get revision(): number {
    return this.currentRevision;
  }

  bump(): void {
    this.currentRevision++;
  }
}
