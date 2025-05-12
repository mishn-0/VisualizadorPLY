import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    port: 5173,
    open: true
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        embedded: resolve(__dirname, 'src/embedded.html')
      },
      output: {
        manualChunks: {
          'three': ['three'],
          'loaders': ['three/examples/jsm/loaders/PLYLoader.js', 'three/examples/jsm/loaders/OBJLoader.js'],
          'controls': ['three/examples/jsm/controls/OrbitControls.js']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}) 