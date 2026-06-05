// Bundles the whole app into ONE self-contained HTML file that runs from
// file:// with no server and no build step — for non-technical learners.
// Run with: npm run build:standalone
import esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const js = (await esbuild.build({
  entryPoints: ['src/main.js'],
  bundle: true,
  format: 'iife',
  minify: true,
  write: false,
})).outputFiles[0].text;

const css = readFileSync('src/styles.css', 'utf8');
const html = readFileSync('index.html', 'utf8')
  .replace(/<link rel="stylesheet" href="\.\/src\/styles\.css" \/>/, `<style>\n${css}\n</style>`)
  .replace(/<script type="module" src="\.\/src\/main\.js"><\/script>/, `<script>\n${js}\n</script>`);

mkdirSync('standalone', { recursive: true });
writeFileSync('standalone/UkeStart.html', html);
console.log(`standalone/UkeStart.html written (${html.length} bytes)`);
