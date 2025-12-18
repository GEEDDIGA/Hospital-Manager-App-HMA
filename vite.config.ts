import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: '[name].[hash].js',
      },
    },
  },
  closeBundle() {
    try {
      mkdirSync(resolve(__dirname, 'dist/electron'), { recursive: true })
      copyFileSync(
        resolve(__dirname, 'main.js'),
        resolve(__dirname, 'dist/electron/main.js')
      )
      console.log('✓ Copied electron/main.js')
    } catch (err) {
      console.log('Note: main.js copy skipped')
    }
  },
})
