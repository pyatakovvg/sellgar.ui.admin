import { ProfileEntity, type AuthServiceInterface, type ProfileServiceInterface } from '@library/domain';
import { type ApplicationStoreInterface, type SessionRuntimeStateInterface } from '@sellgar/app-v2';
import { describe, expect, it, vi } from 'vitest';

import { SignInController } from '../sign-in.controller.ts';

const createController = () => {
  const authService = {
    signIn: vi.fn(),
  } as unknown as AuthServiceInterface;
  const profileService = {
    get: vi.fn(),
  } as unknown as ProfileServiceInterface;
  const store = {
    set: vi.fn(),
  } as unknown as ApplicationStoreInterface;
  const session = {
    setAnonymous: vi.fn(),
    setAuthenticated: vi.fn(),
  } as unknown as SessionRuntimeStateInterface;

  return {
    authService,
    controller: new SignInController(authService, profileService, store, session),
    profileService,
    session,
    store,
  };
};

const createActionArgs = () => ({
  params: {},
  payload: {
    login: 'admin@sellgar.ru',
    password: 'password',
  },
  request: new Request('http://localhost/sign-in', { method: 'POST' }),
});

describe('SignInController', () => {
  it('выполняет полный сценарий входа и переводит session в authenticated', async () => {
    const fixture = createController();
    const profile = {} as ProfileEntity;

    vi.mocked(fixture.profileService.get).mockResolvedValue(profile);

    await expect(fixture.controller.action(createActionArgs())).resolves.toBeUndefined();

    expect(fixture.authService.signIn).toHaveBeenCalledWith('admin@sellgar.ru', 'password');
    expect(fixture.profileService.get).toHaveBeenCalledOnce();
    expect(fixture.store.set).toHaveBeenCalledWith(ProfileEntity, profile);
    expect(fixture.session.setAuthenticated).toHaveBeenCalledOnce();
    expect(fixture.session.setAnonymous).not.toHaveBeenCalled();
    expect(vi.mocked(fixture.authService.signIn).mock.invocationCallOrder[0]).toBeLessThan(
      vi.mocked(fixture.profileService.get).mock.invocationCallOrder[0],
    );
    expect(vi.mocked(fixture.profileService.get).mock.invocationCallOrder[0]).toBeLessThan(
      vi.mocked(fixture.store.set).mock.invocationCallOrder[0],
    );
    expect(vi.mocked(fixture.store.set).mock.invocationCallOrder[0]).toBeLessThan(
      vi.mocked(fixture.session.setAuthenticated).mock.invocationCallOrder[0],
    );
  });

  it('переводит session в anonymous и передаёт ошибку авторизации вызывающему коду', async () => {
    const fixture = createController();
    const error = new Error('Unauthorized');

    vi.mocked(fixture.authService.signIn).mockRejectedValue(error);

    await expect(fixture.controller.action(createActionArgs())).rejects.toBe(error);

    expect(fixture.profileService.get).not.toHaveBeenCalled();
    expect(fixture.store.set).not.toHaveBeenCalled();
    expect(fixture.session.setAuthenticated).not.toHaveBeenCalled();
    expect(fixture.session.setAnonymous).toHaveBeenCalledOnce();
  });
});
