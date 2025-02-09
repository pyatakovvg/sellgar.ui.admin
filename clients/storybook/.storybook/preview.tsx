/** @type { import('@storybook/react').Preview } */

import '@library/kit/src/theme/themes.scss';

export const globalTypes = {
  theme: {
    name: 'Тема',
    description: 'Тема компонентов',
    toolbar: {
      // The label to show for this toolbar item
      title: 'Тема',
      icon: 'globe',
      // Array of plain string values or MenuItem shape (see below)
      items: [
        {
          value: 'light',
          icon: 'circlehollow',
          title: 'Светлая',
          right: 'по умолчанию',
        },
        { value: 'dark', icon: 'circle', title: 'Темная' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
