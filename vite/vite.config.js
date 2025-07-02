import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
let isProduction = true
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "shri2025-task",
  build: {
    target: 'es2022',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: isProduction ? 'terser' : 'esbuild',
    terserOptions: {
      compress: {
        drop_console: isProduction,
        drop_debugger: isProduction,
        pure_funcs: ['console.log'],
        passes: 3,
        ecma: 2022,
      },
      format: {
        comments: false,
      },
      toplevel: true,
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            return 'vendor';
          }

          if (id.includes('utils')) {
            return 'utils';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    sourcemap: false,
    emptyOutDir: true,
  },
  define: {
    __APP_ENV__: JSON.stringify(process.env.VITE_PUBLIC_ENV),
  },
  server: {
    port: 3000,
    open: true,
  }
})
