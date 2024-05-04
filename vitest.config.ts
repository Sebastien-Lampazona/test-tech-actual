import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config'
import { alias } from './vite.config'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'happy-dom',
        include: ['**/*.test.tsx'],
        globals: true
    },
    resolve: {
        alias
    }
})
