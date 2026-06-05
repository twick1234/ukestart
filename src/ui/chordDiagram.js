// Builds an SVG chord diagram string from a chord object. Kept free of DOM
// APIs (returns a string) so the geometry can be tested headlessly.

import { STRINGS } from '../data/chords.js';

export function chordDiagramSVG(chord, { width = 132, height = 168 } = {}) {
  if (!chord) return '';
  const fretsShown = 4;
  const padX = 18;
  const padTop = 30;
  const padBottom = 18;
  const gridW = width - padX * 2;
  const gridH = height - padTop - padBottom;
  const colGap = gridW / (STRINGS.length - 1);
  const rowGap = gridH / fretsShown;

  const parts = [];
  parts.push(
    `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${chord.name} chord diagram" class="chord-svg">`,
  );

  // Nut (thick top bar) — only when the chord is played in open position.
  const lowestFret = Math.min(...chord.frets.filter((f) => f > 0), 99);
  const baseFret = lowestFret > 4 ? lowestFret : 1;
  if (baseFret === 1) {
    parts.push(
      `<rect x="${padX - 1}" y="${padTop - 4}" width="${gridW + 2}" height="4" rx="1" class="nut"/>`,
    );
  } else {
    parts.push(
      `<text x="${padX - 8}" y="${padTop + rowGap / 2}" class="fret-label">${baseFret}</text>`,
    );
  }

  // Fret lines.
  for (let f = 0; f <= fretsShown; f++) {
    const y = padTop + rowGap * f;
    parts.push(`<line x1="${padX}" y1="${y}" x2="${padX + gridW}" y2="${y}" class="grid"/>`);
  }
  // Strings.
  for (let s = 0; s < STRINGS.length; s++) {
    const x = padX + colGap * s;
    parts.push(`<line x1="${x}" y1="${padTop}" x2="${x}" y2="${padTop + gridH}" class="grid"/>`);
    parts.push(`<text x="${x}" y="${height - 4}" class="string-label">${STRINGS[s]}</text>`);
  }

  // Markers per string.
  chord.frets.forEach((fret, s) => {
    const x = padX + colGap * s;
    if (fret === -1) {
      parts.push(`<text x="${x}" y="${padTop - 8}" class="open-mute">x</text>`);
    } else if (fret === 0) {
      parts.push(`<text x="${x}" y="${padTop - 8}" class="open-mute">o</text>`);
    } else {
      const rel = fret - baseFret + 1;
      const y = padTop + rowGap * (rel - 0.5);
      parts.push(`<circle cx="${x}" cy="${y}" r="9" class="dot"/>`);
      const finger = chord.fingers[s];
      if (finger) parts.push(`<text x="${x}" y="${y + 4}" class="finger">${finger}</text>`);
    }
  });

  parts.push('</svg>');
  return parts.join('');
}
