import { defineConfig } from '@vite-pwa/assets-generator/config';

export default defineConfig({
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[64, 'favicon.ico']],
      resizeOptions: {
        background: '#CA052C',
      },
    },
    maskable: {
      sizes: [512],
      resizeOptions: {
        background: '#CA052C',
      },
    },
    apple: {
      sizes: [180],
      resizeOptions: {
        background: '#CA052C',
      },
    },
  },
  images: ['public/app-icon.png'],
});
