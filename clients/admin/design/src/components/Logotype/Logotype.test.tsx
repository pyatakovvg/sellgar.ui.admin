import { render } from '@testing-library/react';

import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Logotype } from './Logotype.tsx';

vi.mock('@library/kit', () => ({
  Logo: () => <div>Mocked Logo</div>,
  Text: () => <div>Mocked Text</div>,
}));

describe('design/components/Logotype', () => {
  it('render component', () => {
    const result = render(<Logotype />);

    expect(result.getByText('Mocked Logo')).toBeInTheDocument();
    expect(result.getByText('Mocked Text')).toBeInTheDocument();
  });
});
