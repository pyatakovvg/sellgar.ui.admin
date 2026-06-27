import { describe, expect, it } from 'vitest';

import { RuntimeErrors } from '../errors';

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

  it('keeps operation error when runtime error handler rejects', async () => {
    const operationError = new Error('Операция завершилась с ошибкой.');
    const errors = new RuntimeErrors({
      report: () => {},
    });

    errors.subscribe(() => {
      throw new Error('Runtime error handler завершился с ошибкой.');
    });

    const result = await executeRuntimeOperation(
      null,
      () => {
        throw operationError;
      },
      errors,
    );

    expect(result).toEqual({
      error: operationError,
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
