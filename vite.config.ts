import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      jsxImportSource: '@remix-run/component',
    }),
  ],
  optimizeDeps: {
    entries: ['index.html', 'src/**/*.{ts,tsx}'],
  },
})
