import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';

import { Button } from './Button.tsx';

describe('Тестирование компонента library/kit/symbols/Button', () => {
  describe('Тестирование базовых свойств', () => {
    const testId = '123123123132';
    const onClick = vi.fn();
    let button: HTMLButtonElement;

    beforeEach(() => {
      render(
        <Button data-testId={testId} onClick={onClick}>
          Click Me
        </Button>,
      );

      button = screen.getByTestId(testId);
    });

    test('-> Корректный рендер компонента', () => {
      expect(button).toBeInTheDocument();
    });

    test('-> Корректная обработка onClick', async () => {
      await userEvent.tripleClick(button);

      expect(onClick).toBeCalled();
    });
  });
});
