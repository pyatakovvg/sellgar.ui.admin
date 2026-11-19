import { defineConfig } from '@vite-pwa/assets-generator/config';

export default defineConfig({
  headLinkOptions: {
    preset: 'default',
  },
  manifestIconsEntry: true,
  preset: 'minimal-2023',
  images: ['public/pwa/SVG_Logo.svg.png'],
});
