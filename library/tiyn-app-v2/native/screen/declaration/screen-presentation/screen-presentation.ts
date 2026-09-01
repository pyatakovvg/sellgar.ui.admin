import type React from 'react';

import type { ScreenAnimation } from '../screen-animation';

export interface ScreenPresentation {
  readonly animation?: ScreenAnimation;
  readonly content: React.ReactNode;
  readonly key: string;
}
