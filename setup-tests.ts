import 'reflect-metadata';
import '@sellgar/kit/inter.css';
import '@sellgar/kit/geologica.css';
import '@sellgar/kit/theme.css';
import '@testing-library/jest-dom';

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
