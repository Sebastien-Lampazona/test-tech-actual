/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-unresolved
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';

export const alias = [
  {
    find: /@mui\/material/,
    replacement: path.resolve(__dirname, 'node_modules', '@mui', 'material'),
  },
  {
    find: '@pages',
    replacement: path.resolve(__dirname, 'resources/js/pages'),
  },
  {
    find: '@layouts',
    replacement: path.resolve(__dirname, 'resources/js/layouts'),
  },
  {
    find: '@components',
    replacement: path.resolve(__dirname, 'resources/js/components'),
  },
  {
    find: '@hooks',
    replacement: path.resolve(__dirname, 'resources/js/hooks'),
  },
  {
    find: '@alTypes',
    replacement: path.resolve(__dirname, 'resources/js/types'),
  },
  {
    find: '@schemaValidation',
    replacement: path.resolve(__dirname, 'resources/js/schemaValidation'),
  },
  {
    find: '@commons',
    replacement: path.resolve(__dirname, 'resources/js/commons'),
  },
  {
    find: '@mocks',
    replacement: path.resolve(__dirname, 'resources/js/__mocks__'),
  },
];

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.tsx'],
      refresh: true,
    }),
    react(),
    reactRefresh({
      // Exclude storybook stories and node_modules
      exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
      // Only .tsx files
      include: '**/*.tsx',
    }),
  ],
  resolve: {
    alias,
  },
});
