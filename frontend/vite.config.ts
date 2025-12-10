import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Optimize build output
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: false,

    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'spectacle': ['spectacle'],
        },
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'spectacle'],
  },
})
