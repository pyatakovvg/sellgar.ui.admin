import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';

import React from 'react';

import { ActionButton } from './ActionButton.tsx'; // Путь к вашему файлу

describe('Тестирование компонента library/kit/symbols/ActionButton', () => {
  describe('Тестирование базовых функций', () => {
    test('-> Корректная отрисовка с текстом и иконкой', () => {
      const icon = <span>Icon</span>; // Пример иконки

      render(<ActionButton icon={icon}>Click Me</ActionButton>);

      expect(screen.getByText('Click Me')).toBeInTheDocument();
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });

    test('-> Корректная отработка onClick', () => {});
  });
});
