import { defineConfig } from '@vite-pwa/assets-generator/config';

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  manifestIconsEntry: true,
  preset: 'minimal-2023',
  images: ['public/SVG_Logo.svg.png'],
});
