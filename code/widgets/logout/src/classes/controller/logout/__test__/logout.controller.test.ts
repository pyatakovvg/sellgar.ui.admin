import type { AuthServiceInterface } from '@library/domain';
import type { ApplicationStoreInterface, SessionRuntimeStateInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { LogoutController } from '../logout.controller.ts';

describe('LogoutController', () => {
  it('завершает сессию и переводит runtime в anonymous после успешного выхода', async () => {
    const signOut = vi.fn().mockResolvedValue(undefined);
    const clear = vi.fn();
    const setAnonymous = vi.fn();
    const authService = { signOut } as unknown as AuthServiceInterface;
    const applicationStore = { clear } as unknown as ApplicationStoreInterface;
    const session = { setAnonymous } as unknown as SessionRuntimeStateInterface;
    const controller = new LogoutController(authService, applicationStore, session);

    await controller.action({
      payload: undefined,
      props: {},
      signal: new AbortController().signal,
    });

    expect(signOut).toHaveBeenCalledOnce();
    expect(clear).toHaveBeenCalledOnce();
    expect(setAnonymous).toHaveBeenCalledOnce();
    expect(clear.mock.invocationCallOrder[0]).toBeGreaterThan(signOut.mock.invocationCallOrder[0]);
    expect(setAnonymous.mock.invocationCallOrder[0]).toBeGreaterThan(clear.mock.invocationCallOrder[0]);
  });

  it('не очищает локальную сессию при ошибке предметного сервиса', async () => {
    const error = new Error('sign out failed');
    const authService = { signOut: vi.fn().mockRejectedValue(error) } as unknown as AuthServiceInterface;
    const applicationStore = { clear: vi.fn() } as unknown as ApplicationStoreInterface;
    const session = { setAnonymous: vi.fn() } as unknown as SessionRuntimeStateInterface;
    const controller = new LogoutController(authService, applicationStore, session);

    await expect(
      controller.action({ payload: undefined, props: {}, signal: new AbortController().signal }),
    ).rejects.toBe(error);

    expect(applicationStore.clear).not.toHaveBeenCalled();
    expect(session.setAnonymous).not.toHaveBeenCalled();
  });
});
