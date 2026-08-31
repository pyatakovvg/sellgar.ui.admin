import { describe, expect, it } from 'vitest';

import { ModuleRefreshGesture } from './module-refresh-gesture.ts';

describe('ModuleRefreshGesture', () => {
  it('does not transfer a gesture from scrolling to refresh after reaching the top', () => {
    const gesture = new ModuleRefreshGesture();

    expect(gesture.scroll(320)).toBe(false);
    expect(gesture.begin(320)).toBe(false);
    expect(gesture.scroll(0)).toBe(false);
    expect(gesture.end(0)).toBe(true);
    expect(gesture.canRefresh()).toBe(false);
  });

  it('allows refresh only on the next gesture started at the top', () => {
    const gesture = new ModuleRefreshGesture();

    gesture.scroll(320);
    gesture.begin(320);
    gesture.scroll(0);
    gesture.end(0);

    expect(gesture.begin(0)).toBe(true);
    expect(gesture.canRefresh()).toBe(true);
  });

  it('enables refresh after momentum reaches the top without an active touch', () => {
    const gesture = new ModuleRefreshGesture();

    gesture.scroll(320);
    gesture.begin(320);
    gesture.end(240);

    expect(gesture.scroll(0)).toBe(true);
    expect(gesture.canRefresh()).toBe(false);
  });
});
