import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync, realpathSync } from 'fs';

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@wasm': resolve(__dirname, '..', 'pkg'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 7700,
    allowedHosts: true,
    fs: {
      // realpathSync resolves the ../pkg symlink to its real path,
      // which Vite uses when checking fs.allow against requested file paths.
      allow: ['..', realpathSync(resolve(__dirname, '../pkg'))],
    },
  },
});
