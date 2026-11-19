/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base relativa: o build funciona em qualquer hospedagem estática
// (GitHub Pages em subpasta, Vercel, Netlify) sem ajuste.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    include: ['src/**/*.test.ts'],
  },
})
