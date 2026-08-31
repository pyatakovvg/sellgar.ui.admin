import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { RouteAnimation } from '../../declaration/route/route.ts';
import { ScreenTransition } from './screen-transition.tsx';

const mocks = vi.hoisted(() => ({
  withTiming: vi.fn((value: number) => value),
}));

vi.mock('react-native', () => ({
  StyleSheet: { absoluteFill: {} },
  useWindowDimensions: () => ({ height: 800, width: 400 }),
}));

vi.mock('react-native-reanimated', async () => {
  const ReactModule = await import('react');
  const animation = { duration: () => animation };

  return {
    cancelAnimation: vi.fn(),
    default: {
      View: ({ children }: { readonly children: React.ReactNode }) => <div>{children}</div>,
    },
    FadeOut: animation,
    SlideOutDown: animation,
    SlideOutLeft: animation,
    SlideOutRight: animation,
    useAnimatedStyle: (factory: () => unknown) => factory(),
    useSharedValue: (value: number) => ReactModule.useRef({ value }).current,
    withTiming: mocks.withTiming,
  };
});

describe('ScreenTransition', () => {
  it('does not replay an existing screen animation for a nested Router push', () => {
    const view = render(createTransition({ focused: true, forward: false }));

    mocks.withTiming.mockClear();
    view.rerender(createTransition({ focused: true, forward: true }));

    expect(mocks.withTiming).not.toHaveBeenCalled();
  });

  it('animates a newly mounted forward screen', () => {
    render(createTransition({ focused: true, forward: true }));

    expect(mocks.withTiming).toHaveBeenCalledWith(1, { duration: 250 });
  });

  it('animates a retained screen when forward navigation focuses it again', () => {
    const view = render(createTransition({ focused: false, forward: false }));

    mocks.withTiming.mockClear();
    view.rerender(createTransition({ focused: true, forward: true }));

    expect(mocks.withTiming).toHaveBeenCalledWith(1, { duration: 250 });
  });
});

const createTransition = (state: { readonly focused: boolean; readonly forward: boolean }) => (
  <ScreenTransition
    animation={RouteAnimation.SlideFromRight}
    backInProgress={false}
    focused={state.focused}
    forward={state.forward}
    order={0}
    topOrder={1}
  >
    screen
  </ScreenTransition>
);
