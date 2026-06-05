// Ukulele chord fingerings for standard re-entrant tuning: G C E A.
// `frets` is an array of 4 numbers, one per string in [G, C, E, A] order.
//   0  = open string
//  -1  = muted / not played
//  n   = press that fret
// `fingers` mirrors `frets`: 0 = no finger, 1=index, 2=middle, 3=ring, 4=pinky.
// `level` groups chords by the lesson at which they are introduced.

export const STRINGS = ['G', 'C', 'E', 'A'];

export const CHORDS = [
  { name: 'C',   frets: [0, 0, 0, 3], fingers: [0, 0, 0, 3], level: 1, family: 'major' },
  { name: 'Am',  frets: [2, 0, 0, 0], fingers: [2, 0, 0, 0], level: 1, family: 'minor' },
  { name: 'F',   frets: [2, 0, 1, 0], fingers: [2, 0, 1, 0], level: 2, family: 'major' },
  { name: 'G7',  frets: [0, 2, 1, 2], fingers: [0, 2, 1, 3], level: 2, family: 'dominant' },
  { name: 'G',   frets: [0, 2, 3, 2], fingers: [0, 1, 3, 2], level: 3, family: 'major' },
  { name: 'C7',  frets: [0, 0, 0, 1], fingers: [0, 0, 0, 1], level: 3, family: 'dominant' },
  { name: 'A',   frets: [2, 1, 0, 0], fingers: [2, 1, 0, 0], level: 3, family: 'major' },
  { name: 'Dm',  frets: [2, 2, 1, 0], fingers: [2, 3, 1, 0], level: 4, family: 'minor' },
  { name: 'D',   frets: [2, 2, 2, 0], fingers: [1, 2, 3, 0], level: 4, family: 'major' },
  { name: 'A7',  frets: [0, 1, 0, 0], fingers: [0, 1, 0, 0], level: 4, family: 'dominant' },
  { name: 'Em',  frets: [0, 4, 3, 2], fingers: [0, 3, 2, 1], level: 5, family: 'minor' },
  { name: 'D7',  frets: [2, 0, 2, 0], fingers: [2, 0, 3, 0], level: 5, family: 'dominant' },
  { name: 'E7',  frets: [1, 2, 0, 2], fingers: [1, 2, 0, 3], level: 5, family: 'dominant' },
];

// The 12-tone chromatic scale used for transposition logic.
export const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
