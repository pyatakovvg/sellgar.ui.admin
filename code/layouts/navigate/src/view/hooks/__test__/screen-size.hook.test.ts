import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import { useScreenSize } from '../screen-size.hook';

const INITIAL_WIDTH_DESCRIPTOR = Object.getOwnPropertyDescriptor(window, 'innerWidth');

const setWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: width });
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  if (INITIAL_WIDTH_DESCRIPTOR) {
    Object.defineProperty(window, 'innerWidth', INITIAL_WIDTH_DESCRIPTOR);
  }
});

describe('useScreenSize', () => {
  it.each([
    { width: 767, expected: { isMobile: true, isTablet: false, isDesktop: false } },
    { width: 768, expected: { isMobile: false, isTablet: true, isDesktop: false } },
    { width: 1023, expected: { isMobile: false, isTablet: true, isDesktop: false } },
    { width: 1024, expected: { isMobile: false, isTablet: false, isDesktop: true } },
  ])('returns the current viewport on every initial render at $width px', ({ width, expected }) => {
    setWidth(width);
    const renders: ReturnType<typeof useScreenSize>[] = [];
    const { result } = renderHook(
      () => {
        const screenSize = useScreenSize();
        renders.push(screenSize);
        return screenSize;
      },
      { wrapper: React.StrictMode },
    );

    expect(result.current).toEqual(expected);
    expect(renders.length).toBeGreaterThan(0);
    for (const screenSize of renders) {
      expect(screenSize).toEqual(expected);
    }
  });

  it('updates the selected viewport when resizing across breakpoints', () => {
    setWidth(1440);
    const { result } = renderHook(useScreenSize);

    const resizes = [
      { width: 1023, expected: { isMobile: false, isTablet: true, isDesktop: false } },
      { width: 767, expected: { isMobile: true, isTablet: false, isDesktop: false } },
      { width: 768, expected: { isMobile: false, isTablet: true, isDesktop: false } },
      { width: 1024, expected: { isMobile: false, isTablet: false, isDesktop: true } },
    ];
    for (const { width, expected } of resizes) {
      act(() => {
        setWidth(width);
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toEqual(expected);
    }
  });

  it('removes its resize subscription on unmount', () => {
    const addListener = vi.spyOn(window, 'addEventListener');
    const removeListener = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(useScreenSize);
    expect(addListener).toHaveBeenLastCalledWith('resize', expect.any(Function));
    const subscription = addListener.mock.lastCall;
    unmount();
    expect(removeListener).toHaveBeenCalledWith('resize', subscription?.[1]);
  });
});
