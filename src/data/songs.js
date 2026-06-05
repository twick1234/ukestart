// Song library. Every song here is in the PUBLIC DOMAIN (traditional folk
// songs and pre-1929 compositions) or is an original practice exercise written
// for this app, so the lyrics and chord charts can be shipped freely.
//
// `lines` is an array of { chords, lyric } pairs. `chords` is a string where
// chord names sit roughly above the syllable they change on (rendered in a
// monospace lane above the lyric). Keep it simple for beginners.

export const SONGS = [
  {
    id: 'twinkle',
    title: 'Twinkle, Twinkle, Little Star',
    origin: 'Traditional (public domain)',
    difficulty: 1,
    chords: ['C', 'F', 'G7'],
    strum: 'Down, Down, Down, Down (one strum per beat)',
    tip: 'Only three chords. Take it slowly and let each chord ring.',
    lines: [
      { chords: 'C        F     C', lyric: 'Twinkle twinkle little star' },
      { chords: 'F     C      G7   C', lyric: 'How I wonder what you are' },
      { chords: 'C       G7  C      G7', lyric: 'Up above the world so high' },
      { chords: 'C        G7   C     G7', lyric: 'Like a diamond in the sky' },
      { chords: 'C        F     C', lyric: 'Twinkle twinkle little star' },
      { chords: 'F     C      G7   C', lyric: 'How I wonder what you are' },
    ],
  },
  {
    id: 'saints',
    title: 'When the Saints Go Marching In',
    origin: 'Traditional gospel (public domain)',
    difficulty: 2,
    chords: ['C', 'G7', 'F'],
    strum: 'Down, Down-Up, Down, Down-Up',
    tip: 'A great song for practicing the C to F to G7 switch in a loop.',
    lines: [
      { chords: 'C', lyric: 'Oh when the saints' },
      { chords: 'C', lyric: 'Go marching in' },
      { chords: 'C            C7        F', lyric: 'Oh when the saints go marching in' },
      { chords: 'C          G7', lyric: 'Oh how I want to be' },
      { chords: 'C        G7', lyric: 'In that number' },
      { chords: 'C      F   C   G7  C', lyric: 'When the saints go marching in' },
    ],
  },
  {
    id: 'clementine',
    title: 'Oh My Darling, Clementine',
    origin: 'Traditional American (public domain)',
    difficulty: 2,
    chords: ['C', 'G7'],
    strum: 'Waltz feel: Down, Down, Down (3 beats per bar)',
    tip: 'Two chords only and a gentle 3/4 waltz swing. Sway with it.',
    lines: [
      { chords: 'C', lyric: 'In a cavern, in a canyon' },
      { chords: 'G7', lyric: 'Excavating for a mine' },
      { chords: 'C', lyric: 'Dwelt a miner, forty-niner' },
      { chords: 'G7        C', lyric: 'And his daughter Clementine' },
    ],
  },
  {
    id: 'sloop-am-f',
    title: 'Island Loop (practice exercise)',
    origin: 'Original exercise for this app',
    difficulty: 1,
    chords: ['Am', 'F', 'C', 'G7'],
    strum: 'Down, Down-Up, Up, Down-Up',
    tip: 'No words to worry about. Loop this progression until the changes feel smooth.',
    lines: [
      { chords: 'Am      F       C       G7', lyric: '(strum each chord for one full bar, then repeat)' },
      { chords: 'Am      F       C       G7', lyric: '(speed up only once it sounds clean and even)' },
    ],
  },
  {
    id: 'row',
    title: 'Row, Row, Row Your Boat',
    origin: 'Traditional (public domain)',
    difficulty: 1,
    chords: ['C'],
    strum: 'Down, Down, Down (gentle and rolling)',
    tip: 'One single chord for the whole song. Perfect for your very first day.',
    lines: [
      { chords: 'C', lyric: 'Row, row, row your boat' },
      { chords: 'C', lyric: 'Gently down the stream' },
      { chords: 'C', lyric: 'Merrily, merrily, merrily, merrily' },
      { chords: 'C', lyric: 'Life is but a dream' },
    ],
  },
  {
    id: 'sloop',
    title: 'Three-Chord Town (practice exercise)',
    origin: 'Original exercise for this app',
    difficulty: 3,
    chords: ['C', 'F', 'G'],
    strum: 'Down, Down-Up, Up-Down-Up',
    tip: 'The I-IV-V progression that powers thousands of real songs. Master this shape.',
    lines: [
      { chords: 'C           C           F           G', lyric: '(one bar each — this is the classic pop turnaround)' },
      { chords: 'C           F           G           C', lyric: '(resolve back home to C on the final bar)' },
    ],
  },
];
