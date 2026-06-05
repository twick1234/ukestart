import { describe, it, expect } from 'vitest';
import { chordDiagramSVG } from '../../src/ui/chordDiagram.js';
import { getChord } from '../../src/lib/chordLibrary.js';

describe('chordDiagramSVG', () => {
  it('returns an empty string for no chord', () => {
    expect(chordDiagramSVG(undefined)).toBe('');
  });

  it('produces an svg with an accessible label', () => {
    const svg = chordDiagramSVG(getChord('C'));
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg).toContain('aria-label="C chord diagram"');
  });

  it('draws a finger dot for the fretted C string', () => {
    const svg = chordDiagramSVG(getChord('C'));
    expect(svg).toContain('class="dot"');
    expect(svg).toContain('>3<'); // ring finger label
  });

  it('marks open strings with o', () => {
    const svg = chordDiagramSVG(getChord('C'));
    expect((svg.match(/class="open-mute">o/g) || []).length).toBe(3);
  });
});
