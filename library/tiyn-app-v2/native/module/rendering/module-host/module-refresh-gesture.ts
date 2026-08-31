export type ModuleRefreshGestureOwner = 'refresh' | 'scroll';

export class ModuleRefreshGesture {
  private activeOwner: ModuleRefreshGestureOwner | null = null;
  private lastOwner: ModuleRefreshGestureOwner | null = null;
  private scrollOffset = 0;

  begin(offset: number): boolean {
    this.scrollOffset = Math.max(0, offset);
    this.activeOwner = this.scrollOffset <= 0 ? 'refresh' : 'scroll';
    this.lastOwner = this.activeOwner;

    return this.activeOwner === 'refresh';
  }

  end(offset: number): boolean {
    this.scrollOffset = Math.max(0, offset);
    this.activeOwner = null;

    return this.scrollOffset <= 0;
  }

  scroll(offset: number): boolean {
    this.scrollOffset = Math.max(0, offset);

    if (this.activeOwner !== null) {
      return this.activeOwner === 'refresh';
    }

    return this.scrollOffset <= 0;
  }

  canRefresh(): boolean {
    return this.lastOwner === 'refresh';
  }
}
