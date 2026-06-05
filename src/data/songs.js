// Song library. Every song here is in the PUBLIC DOMAIN (traditional folk
// songs and pre-1929 compositions) or is an original practice exercise written
// for this app, so the lyrics and chord charts can be shipped freely.
//
// `lines` is an array of { chords, lyric } pairs. `chords` is a string where
// chord names sit roughly above the syllable they change on (rendered in a
// monospace lane above the lyric). Keep it simple for beginners.

export const SONGS = [
  // ── LEVEL 1 ─────────────────────────────────────────────────────────────

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
    id: 'valley',
    title: 'Down in the Valley',
    origin: 'Traditional American (public domain)',
    difficulty: 1,
    chords: ['C', 'G7'],
    strum: 'Waltz: Down, Down, Down (3 beats per bar)',
    tip: 'Just two chords in a gentle 3/4 waltz. The C to G7 switch is the most useful move you will learn.',
    lines: [
      { chords: 'C                      G7', lyric: 'Down in the valley, the valley so low' },
      { chords: 'G7                         C', lyric: 'Hang your head over, hear the wind blow' },
      { chords: 'C                          G7', lyric: 'Hear the wind blow dear, hear the wind blow' },
      { chords: 'G7                         C', lyric: 'Hang your head over, hear the wind blow' },
      { chords: 'C                     G7', lyric: 'Roses love sunshine, violets love dew' },
      { chords: 'G7                       C', lyric: 'Angels in heaven know I love you' },
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

  // ── LEVEL 2 ─────────────────────────────────────────────────────────────

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
      { chords: 'C', lyric: 'Oh my darling, oh my darling' },
      { chords: 'G7', lyric: 'Oh my darling Clementine' },
      { chords: 'C', lyric: 'You are lost and gone forever' },
      { chords: 'G7        C', lyric: 'Dreadful sorry, Clementine' },
    ],
  },

  {
    id: 'la-bamba',
    title: 'La Bamba',
    origin: 'Traditional Mexican folk song (public domain)',
    difficulty: 2,
    chords: ['C', 'F', 'G'],
    strum: 'Down, Down-Up, Down-Up (keep the hand moving)',
    tip: 'The whole song is one looping C–F–G pattern. Once you have it, the rhythm is the fun part — get it swinging.',
    lines: [
      { chords: 'C  F  G', lyric: 'Bamba, bamba' },
      { chords: 'C  F  G', lyric: 'Bamba, bamba' },
      { chords: 'C    F    G', lyric: 'Para bailar La Bamba' },
      { chords: 'C    F    G', lyric: 'Para bailar La Bamba' },
      { chords: 'C     F          G          C', lyric: 'Se necesita una poca de gracia' },
      { chords: 'F       G         C', lyric: 'Una poca de gracia para mí, para ti' },
      { chords: 'C   F  G    C', lyric: 'Ay arriba, ay arriba' },
      { chords: 'C   F   G       C', lyric: 'Ay arriba iré, yo no soy marinero' },
    ],
  },

  {
    id: 'saints',
    title: 'When the Saints Go Marching In',
    origin: 'Traditional gospel (public domain)',
    difficulty: 2,
    chords: ['C', 'G7', 'F'],
    strum: 'Down, Down-Up, Down, Down-Up',
    tip: 'A great song for practising the C to F to G7 switch in a loop.',
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
    id: 'ballgame',
    title: 'Take Me Out to the Ballgame',
    origin: 'Von Tilzer & Norworth, 1908 (public domain)',
    difficulty: 2,
    chords: ['C', 'G7', 'F', 'D7', 'A7'],
    strum: 'Waltz: Down, Down, Down (3 beats, feel the oom-pah-pah)',
    tip: 'A classic Tin Pan Alley waltz — perfect for ukulele. The D7 and A7 are easy one or two-finger shapes.',
    lines: [
      { chords: 'C             G7', lyric: 'Take me out to the ballgame' },
      { chords: 'G7                  C', lyric: 'Take me out with the crowd' },
      { chords: 'C          F         A7', lyric: 'Buy me some peanuts and Cracker Jack' },
      { chords: 'D7                        G7', lyric: "I don't care if I never get back" },
      { chords: 'C             G7', lyric: 'Let me root, root, root for the home team' },
      { chords: 'G7                    C', lyric: "If they don't win it's a shame" },
      { chords: 'F       C          A7      D7', lyric: "For it's one, two, three strikes you're out" },
      { chords: 'G7                  C', lyric: 'At the old ball game' },
    ],
  },

  // ── LEVEL 3 ─────────────────────────────────────────────────────────────

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

  {
    id: 'scarborough',
    title: 'Scarborough Fair',
    origin: 'Traditional English (public domain)',
    difficulty: 3,
    chords: ['Dm', 'C', 'F', 'G'],
    strum: 'Waltz: Down, Down, Down — very gently (3/4 time)',
    tip: 'This haunting song is in D minor. Let the notes ring as long as possible between chord changes.',
    lines: [
      { chords: 'Dm            C         Dm', lyric: 'Are you going to Scarborough Fair?' },
      { chords: 'F           Dm    C', lyric: 'Parsley, sage, rosemary, and thyme' },
      { chords: 'Dm            C            F', lyric: 'Remember me to one who lives there' },
      { chords: 'Dm          C         Dm', lyric: 'She once was a true love of mine' },
      { chords: 'Dm            C         Dm', lyric: 'Tell her to make me a cambric shirt' },
      { chords: 'F           Dm    C', lyric: 'Parsley, sage, rosemary, and thyme' },
      { chords: 'Dm            C               F', lyric: 'Without no seams nor needlework' },
      { chords: 'Dm          C         Dm', lyric: 'Then she shall be a true love of mine' },
    ],
  },

  // ── LEVEL 4 ─────────────────────────────────────────────────────────────

  {
    id: 'greensleeves',
    title: 'Greensleeves',
    origin: 'Traditional English (public domain)',
    difficulty: 3,
    chords: ['Am', 'G', 'C', 'E7'],
    strum: 'Waltz: Down, Down-Up, Down-Up (3/4, one strum per beat)',
    tip: 'A beautiful minor waltz. The E7 chord is the trickiest shape here — practise it separately before playing through.',
    lines: [
      { chords: 'Am        G          C', lyric: 'Alas my love, you do me wrong' },
      { chords: '         Am    E7', lyric: 'To cast me off discourteously' },
      { chords: 'Am           G           C', lyric: 'For I have loved you so long' },
      { chords: '      Am        E7       Am', lyric: 'Delighting in your company' },
      { chords: 'C           G           C', lyric: 'Greensleeves was all my joy' },
      { chords: '      Am     E7', lyric: 'Greensleeves was my delight' },
      { chords: 'C          G            C', lyric: 'Greensleeves was my heart of gold' },
      { chords: '      Am    E7    Am', lyric: 'And who but my lady Greensleeves' },
    ],
  },

  {
    id: 'rising-sun',
    title: 'House of the Rising Sun',
    origin: 'Traditional American (public domain)',
    difficulty: 4,
    chords: ['Am', 'C', 'D', 'F', 'E7'],
    strum: 'Fingerpick: p-i-m-a-m-i per bar (or slow Down, Down-Up)',
    tip: 'The classic Am–C–D–F–Am–E7 pattern repeats for every verse. If fingerpicking feels too hard, one slow down-strum per chord still sounds brilliant.',
    lines: [
      { chords: 'Am    C    D       F', lyric: 'There is a house in New Orleans' },
      { chords: 'Am       C    E7', lyric: 'They call the Rising Sun' },
      { chords: 'Am    C       D          F', lyric: "It's been the ruin of many a poor boy" },
      { chords: 'Am    E7    Am', lyric: 'And God I know I\'m one' },
      { chords: 'Am    C     D           F', lyric: 'My mother was a tailor' },
      { chords: 'Am       C     E7', lyric: 'She sewed my new blue jeans' },
      { chords: 'Am    C      D              F', lyric: 'My father was a gambling man' },
      { chords: 'Am    E7    Am', lyric: 'Down in New Orleans' },
    ],
  },
];
