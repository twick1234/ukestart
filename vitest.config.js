import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',     // chordDiagram + audio guards expect a window
    include: ['tests/unit/**/*.test.js'],
    coverage: { provider: 'v8', include: ['src/lib/**', 'src/ui/chordDiagram.js'] },
  },
});
