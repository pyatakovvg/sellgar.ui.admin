import { describe, expect, it } from 'vitest';

import { param, segments } from '../../declaration/address';
import { Route } from '../../declaration/route';
import { Router } from '../../declaration/router';
import { createCoreNavigate } from '../../service/navigate-service';

import { matchesNavigationRoute, matchesNavigationState, type NavigationState } from './navigation-state.ts';

abstract class OneRoute {
  declare readonly id: string;
}

abstract class TwiseRoute {
  declare readonly id: string;
}

abstract class MissingRoute {}
abstract class NamedIndexRoute {}

const nestedRouter = new Router({
  routes: [new Route({ address: segments('twise', param('id')), load: async () => ({}), token: TwiseRoute })],
});

const indexRoute = new Route({ load: async () => ({}) });
const namedIndexRoute = new Route({ load: async () => ({}), token: NamedIndexRoute });

const oneRoute = new Route({
  address: segments('ones', param('id')),
  routes: [indexRoute],
  routing: [nestedRouter],
  token: OneRoute,
});

const router = new Router({
  routes: [oneRoute],
});

describe('matchesNavigationRoute', () => {
  it('matches the terminal token by default across nested Router scopes', async () => {
    const navigation = await createNavigation();

    expect(matchesNavigationRoute(navigation, TwiseRoute)).toBe(true);
    expect(matchesNavigationRoute(navigation, OneRoute)).toBe(false);
    expect(matchesNavigationRoute(navigation, MissingRoute)).toBe(false);
  });

  it('matches active ancestors when end is false', async () => {
    const navigation = await createNavigation();

    expect(matchesNavigationRoute(navigation, OneRoute, { end: false })).toBe(true);
  });

  it('ignores addressless index routes when matching the terminal token', async () => {
    const navigation = await createOneNavigation();
    const oneEntry = navigation.root.path.at(-1);

    if (!oneEntry) {
      throw new Error('One route entry was not created.');
    }

    const indexNavigation: NavigationState = {
      ...navigation,
      root: {
        ...navigation.root,
        path: [...navigation.root.path, { params: {}, route: indexRoute, token: undefined }],
      },
    };

    expect(oneEntry.token).toBe(OneRoute);
    expect(matchesNavigationRoute(indexNavigation, OneRoute)).toBe(true);
  });

  it('treats a named addressless descendant as a distinct terminal route', async () => {
    const navigation = await createOneNavigation();
    const namedIndexNavigation: NavigationState = {
      ...navigation,
      root: {
        ...navigation.root,
        path: [...navigation.root.path, { params: {}, route: namedIndexRoute, token: NamedIndexRoute }],
      },
    };

    expect(matchesNavigationRoute(namedIndexNavigation, OneRoute)).toBe(false);
    expect(matchesNavigationRoute(namedIndexNavigation, NamedIndexRoute)).toBe(true);
  });

  it('optionally narrows a token match by its own params', async () => {
    const navigation = await createNavigation();

    expect(matchesNavigationRoute(navigation, OneRoute, { end: false, params: { id: 'one-1' } })).toBe(true);
    expect(matchesNavigationRoute(navigation, OneRoute, { end: false, params: { id: 'one-2' } })).toBe(false);
    expect(matchesNavigationRoute(navigation, TwiseRoute, { params: { id: 'twise-2' } })).toBe(true);
    expect(matchesNavigationRoute(navigation, TwiseRoute, { params: { id: 'twise-3' } })).toBe(false);
  });

  it('does not match an absent navigation', () => {
    expect(matchesNavigationRoute(null, TwiseRoute)).toBe(false);
    expect(matchesNavigationRoute(undefined, TwiseRoute)).toBe(false);
  });
});

describe('matchesNavigationState', () => {
  it('matches the complete scoped target including equal parameter names on ancestors', async () => {
    const target = await createNavigation('one-1', 'twise-2');
    const same = await createNavigation('one-1', 'twise-2');
    const differentAncestor = await createNavigation('one-next', 'twise-2');

    expect(matchesNavigationState(same, target)).toBe(true);
    expect(matchesNavigationState(differentAncestor, target)).toBe(false);
  });

  it('keeps an owner target active across a nested Router without matching another local descendant', async () => {
    const one = await createOneNavigation();
    const twise = await createNavigation('one-1', 'twise-2');
    const otherBranch = await createNavigation('one-next', 'twise-2');
    const localDescendant: NavigationState = {
      ...one,
      root: {
        ...one.root,
        path: [...one.root.path, { params: {}, route: namedIndexRoute, token: NamedIndexRoute }],
      },
    };

    expect(matchesNavigationState(twise, one)).toBe(true);
    expect(matchesNavigationState(twise, one, { end: false })).toBe(true);
    expect(matchesNavigationState(otherBranch, one, { end: false })).toBe(false);
    expect(matchesNavigationState(localDescendant, one)).toBe(false);
  });
});

const createNavigation = async (oneId = 'one-1', twiseId = 'twise-2'): Promise<NavigationState> => {
  let navigation: NavigationState | undefined;
  const navigate = createCoreNavigate({
    back: () => undefined,
    execute: (next) => {
      navigation = next;
    },
    router,
  });

  await navigate.through(OneRoute, { params: { id: oneId } }).to(TwiseRoute, { params: { id: twiseId } });

  if (!navigation) {
    throw new Error('Navigation state was not created.');
  }

  return navigation;
};

const createOneNavigation = async (): Promise<NavigationState> => {
  let navigation: NavigationState | undefined;
  const navigate = createCoreNavigate({
    back: () => undefined,
    execute: (next) => {
      navigation = next;
    },
    router,
  });

  await navigate.to(OneRoute, { params: { id: 'one-1' } });

  if (!navigation) {
    throw new Error('Navigation state was not created.');
  }

  return navigation;
};
