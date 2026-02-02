import { defineConfig } from 'vite';

export default defineConfig({
  root: './dev',
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true, // Show errors in overlay
    },
    watch: {
      // Watch src files for changes
      ignored: ['!**/src/**'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: '../dist-dev',
    emptyOutDir: true,
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['lit', 'custom-card-helpers'],
  },
  // Watch dist folder and reload when built files change
  plugins: [
    {
      name: 'watch-dist',
      configureServer(server) {
        // Watch the dist directory for changes from rollup build
        server.watcher.add('../dist/rssfeed-metro-tile.js');

        server.watcher.on('change', async file => {
          if (file.includes('dist/rssfeed-metro-tile.js')) {
            console.log('🔄 Card rebuilt, reloading...');
            server.ws.send({
              type: 'full-reload',
              path: '*',
            });
          }
        });
      },
    },
  ],
});
