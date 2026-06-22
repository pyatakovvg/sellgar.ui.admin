import { describe, expect, it, vi } from 'vitest';

import type { RuntimeErrorReport } from '../../../application/reporting/runtime-error-report';
import { RuntimeErrorReporterInterface } from '../../../application/reporting/runtime-error-reporter';

import { RevalidateService } from './';

describe('RevalidateService', () => {
  it('runs registered keyed handlers by key', async () => {
    const fixture = createFixture();
    const handler = vi.fn();
    const fallback = vi.fn();

    fixture.service.register(ProfileController, handler);
    fixture.service.registerFallback(fallback);

    await fixture.service.revalidate(ProfileController);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(fallback).not.toHaveBeenCalled();
  });

  it('runs fallback handlers when keyed handlers are missing', async () => {
    const fixture = createFixture();
    const fallback = vi.fn();

    fixture.service.registerFallback(fallback);

    await fixture.service.revalidate(MissingController);

    expect(fallback).toHaveBeenCalledTimes(1);
  });

  it('runs every keyed handler when key is not provided', async () => {
    const fixture = createFixture();
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();
    const fallback = vi.fn();

    fixture.service.register(FirstController, firstHandler);
    fixture.service.register(SecondController, secondHandler);
    fixture.service.registerFallback(fallback);

    await fixture.service.revalidate();

    expect(firstHandler).toHaveBeenCalledTimes(1);
    expect(secondHandler).toHaveBeenCalledTimes(1);
    expect(fallback).not.toHaveBeenCalled();
  });

  it('runs fallback handlers when revalidate has no keyed handlers', async () => {
    const fixture = createFixture();
    const fallback = vi.fn();

    fixture.service.registerFallback(fallback);

    await fixture.service.revalidate();

    expect(fallback).toHaveBeenCalledTimes(1);
  });

  it('unregisters keyed handlers', async () => {
    const fixture = createFixture();
    const handler = vi.fn();
    const fallback = vi.fn();

    fixture.service.register(ProfileController, handler);
    fixture.service.registerFallback(fallback);
    fixture.service.unregister(ProfileController, handler);

    await fixture.service.revalidate(ProfileController);

    expect(handler).not.toHaveBeenCalled();
    expect(fallback).toHaveBeenCalledTimes(1);
  });

  it('unregisters fallback handlers', async () => {
    const fixture = createFixture();
    const fallback = vi.fn();

    fixture.service.registerFallback(fallback);
    fixture.service.unregisterFallback(fallback);

    await fixture.service.revalidate();

    expect(fallback).not.toHaveBeenCalled();
  });

  it('reports rejected handlers without rejecting revalidate', async () => {
    const fixture = createFixture();
    const error = new Error('Revalidate завершился с ошибкой.');

    fixture.service.register(ProfileController, () => {
      throw error;
    });

    await expect(fixture.service.revalidate(ProfileController)).resolves.toBeUndefined();

    expect(fixture.reporter.reportMock).toHaveBeenCalledWith({
      code: 'revalidate.handler.failed',
      error,
    });
  });
});

interface Fixture {
  readonly reporter: TestRuntimeErrorReporter;
  readonly service: RevalidateService;
}

const createFixture = (): Fixture => {
  const reporter = new TestRuntimeErrorReporter();

  return {
    reporter,
    service: new RevalidateService(reporter),
  };
};

class TestRuntimeErrorReporter extends RuntimeErrorReporterInterface {
  readonly reportMock = vi.fn();

  report(report: RuntimeErrorReport): void {
    this.reportMock(report);
  }
}

class FirstController {}

class MissingController {}

class ProfileController {}

class SecondController {}
