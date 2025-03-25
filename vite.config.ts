import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  envDir: '.',  // Explicitly tell Vite where to look for .env files
  server: {
    hmr: {
      clientPort: 443,
      port: 5173
    },
    host: true,
    watch: {
      usePolling: true
    },
    https: false, // Disable HTTPS for local development
    proxy: {
      '/rest/v1': {
        target: process.env.VITE_SUPABASE_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/rest\/v1/, '/rest/v1')
      }
    }
  }
});