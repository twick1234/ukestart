import { defineConfig } from 'vite';

// Static multi-asset site. Root is the project dir; build emits to /dist.
export default defineConfig({
  root: '.',
  build: { outDir: 'dist', emptyOutDir: true },
  server: { open: true, port: 5173 },
});
