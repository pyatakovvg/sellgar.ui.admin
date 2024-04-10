/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const config = {
  framework: {
    name: '@storybook/react-vite',
    options: {
      // ...
    },
  },
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-essentials',
    'storybook-css-modules',
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          implementation: require('sass'),
        },
      },
    },
  ],
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
      propFilter: () => true,
    },
  },
};
export default config;
